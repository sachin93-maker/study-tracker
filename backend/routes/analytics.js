const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const StudySession = require('../models/StudySession');
const { protect } = require('../middleware/authMiddleware');

// Mock data array for fallback when MongoDB is not connected
let mockSessions = [];

// Log a new study session
router.post('/sessions', protect, async (req, res) => {
  try {
    const { subject, duration, date } = req.body;
    
    // Check if MongoDB is connected (readyState 1 = connected)
    if (mongoose.connection.readyState === 1) {
      const session = new StudySession({
        user: req.user.id,
        subject,
        duration,
        date: date || new Date()
      });
      const savedSession = await session.save();
      return res.status(201).json(savedSession);
    } else {
      // Fallback to mock data
      const newSession = {
        _id: Date.now().toString(),
        userIdFallback: req.user.id,
        subject,
        duration,
        date: date ? new Date(date) : new Date()
      };
      mockSessions.push(newSession);
      return res.status(201).json(newSession);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get daily analytics breakdown
router.get('/analytics/daily', protect, async (req, res) => {
  try {
    const { date } = req.query; // Expecting YYYY-MM-DD
    if (!date) return res.status(400).json({ error: 'Date parameter is required (YYYY-MM-DD)' });

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    let subjectData = [];

    if (mongoose.connection.readyState === 1) {
      subjectData = await StudySession.aggregate([
        { 
          $match: { 
            user: new mongoose.Types.ObjectId(req.user.id),
            date: { $gte: startDate, $lte: endDate }
          } 
        },
        {
          $group: {
            _id: "$subject",
            totalDuration: { $sum: "$duration" }
          }
        },
        { $sort: { totalDuration: -1 } }
      ]);
    } else {
      // Fallback
      const userSessions = mockSessions.filter(s => s.userIdFallback === req.user.id);
      const dailySessions = userSessions.filter(s => {
        const sDate = s.date.toISOString().split('T')[0];
        return sDate === date;
      });

      const subjectMap = {};
      dailySessions.forEach(s => {
        subjectMap[s.subject] = (subjectMap[s.subject] || 0) + s.duration;
      });
      subjectData = Object.keys(subjectMap)
        .map(k => ({ _id: k, totalDuration: subjectMap[k] }))
        .sort((a,b) => b.totalDuration - a.totalDuration);
    }

    res.json(subjectData.map(item => ({
      subject: item._id,
      duration: item.totalDuration
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get analytics: Weekly totals and Subject breakdown
router.get('/analytics', protect, async (req, res) => {
  try {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    let weeklyData = [];
    let subjectData = [];

    if (mongoose.connection.readyState === 1) {
      // Aggregate by day for the last 7 days (weekly bar chart) using MongoDB Pipeline
      weeklyData = await StudySession.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(req.user.id), date: { $gte: startOfWeek } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalDuration: { $sum: "$duration" }
          }
        },
        { $sort: { _id: 1 } }
      ]);

      // Aggregate by subject for pie chart using MongoDB Pipeline (Default: All time)
      subjectData = await StudySession.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
        {
          $group: {
            _id: "$subject",
            totalDuration: { $sum: "$duration" }
          }
        },
        { $sort: { totalDuration: -1 } }
      ]);
    } else {
      // Fallback aggregation using JS arrays
      const userSessions = mockSessions.filter(s => s.userIdFallback === req.user.id);
      const recent = userSessions.filter(s => s.date >= startOfWeek);
      
      const weeklyMap = {};
      recent.forEach(s => {
        const dStr = s.date.toISOString().split('T')[0];
        weeklyMap[dStr] = (weeklyMap[dStr] || 0) + s.duration;
      });
      weeklyData = Object.keys(weeklyMap).map(k => ({ _id: k, totalDuration: weeklyMap[k] })).sort((a,b) => a._id.localeCompare(b._id));

      const subjectMap = {};
      userSessions.forEach(s => {
        subjectMap[s.subject] = (subjectMap[s.subject] || 0) + s.duration;
      });
      subjectData = Object.keys(subjectMap)
        .map(k => ({ _id: k, totalDuration: subjectMap[k] }))
        .sort((a,b) => b.totalDuration - a.totalDuration);
    }

    // Format weekly data for charting
    const formattedWeeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      const match = weeklyData.find(item => item._id === dateString);
      formattedWeeklyData.push({
        date: dateString,
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        duration: match ? match.totalDuration : 0
      });
    }

    const formattedSubjectData = subjectData.map(item => ({
      subject: item._id,
      duration: item.totalDuration
    }));

    // --- Streak Calculation ---
    let allSessionDates = [];
    if (mongoose.connection.readyState === 1) {
      const sessions = await StudySession.find({ user: req.user.id }).select('date').sort({ date: -1 });
      allSessionDates = sessions.map(s => s.date.toISOString().split('T')[0]);
    } else {
      const userSessions = mockSessions.filter(s => s.userIdFallback === req.user.id);
      allSessionDates = userSessions.map(s => s.date.toISOString().split('T')[0]).sort().reverse();
    }

    // Remove duplicates
    const uniqueDates = [...new Set(allSessionDates)];
    
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (uniqueDates.includes(today) || uniqueDates.includes(yesterdayStr)) {
      let currentCheck = uniqueDates.includes(today) ? new Date() : yesterday;
      
      while (true) {
        const checkStr = currentCheck.toISOString().split('T')[0];
        if (uniqueDates.includes(checkStr)) {
          streak++;
          currentCheck.setDate(currentCheck.getDate() - 1);
        } else {
          break;
        }
      }
    }

    res.json({
      weekly: formattedWeeklyData,
      subjects: formattedSubjectData,
      streak: streak
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get class leaderboard
router.get('/leaderboard', protect, async (req, res) => {
  try {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    let leaderboard = [];

    if (mongoose.connection.readyState === 1) {
      leaderboard = await StudySession.aggregate([
        { $match: { date: { $gte: startOfWeek } } },
        { $group: { _id: "$user", totalDuration: { $sum: "$duration" } } },
        { $sort: { totalDuration: -1 } },
        { $limit: 10 },
        { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'userInfo' } },
        { $unwind: "$userInfo" },
        { $project: { name: "$userInfo.name", duration: "$totalDuration" } }
      ]);
    } else {
      // Fallback
      const recent = mockSessions.filter(s => s.date >= startOfWeek);
      const userMap = {};
      recent.forEach(s => {
        if (!userMap[s.userIdFallback]) userMap[s.userIdFallback] = 0;
        userMap[s.userIdFallback] += s.duration;
      });
      leaderboard = Object.keys(userMap).map(userId => {
        // Find user name if mockUsers was imported, but here we'll just mock it
        return { _id: userId, name: `User ${userId.substring(0,4)}`, duration: userMap[userId] };
      }).sort((a,b) => b.duration - a.duration).slice(0, 10);
    }

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
