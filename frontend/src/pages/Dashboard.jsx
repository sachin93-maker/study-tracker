import { useState, useEffect, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Book, Clock, TrendingUp, Plus, Activity } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const API_URL = '/api';
const COLORS = ['#8aebff', '#deb7ff', '#d5dcf6', '#2fd9f4', '#603389', '#22d3ee'];

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState({ weekly: [], subjects: [] });
  const [dailySubjects, setDailySubjects] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(true);
  const [dailyLoading, setDailyLoading] = useState(false);

  const fetchAnalytics = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${API_URL}/analytics`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (response.status === 401) {
        logout();
        navigate('/auth');
        return;
      }
      const data = await response.json();
      setAnalytics(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  const fetchDailyAnalytics = async (date) => {
    if (!user) return;
    setDailyLoading(true);
    try {
      const response = await fetch(`${API_URL}/analytics/daily?date=${date}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const data = await response.json();
      setDailySubjects(Array.isArray(data) ? data : []);
      setDailyLoading(false);
    } catch (error) {
      console.error('Error fetching daily analytics:', error);
      setDailyLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else {
      fetchAnalytics();
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user && selectedDate) {
      fetchDailyAnalytics(selectedDate);
    }
  }, [user, selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !duration || !user) return;

    try {
      await fetch(`${API_URL}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ subject, duration: Number(duration) }),
      });
      setSubject('');
      setDuration('');
      fetchAnalytics();
    } catch (error) {
      console.error('Error logging session:', error);
    }
  };

  if (!user) return null;

  const totalWeeklyMinutes = analytics.weekly.reduce((acc, curr) => acc + curr.duration, 0);
  const topSubject = analytics.subjects.length > 0 ? analytics.subjects[0].subject : 'N/A';

  const handleBarClick = (data) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const clickedDate = data.activePayload[0].payload.date;
      setSelectedDate(clickedDate);
    }
  };

  const formatDateLabel = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="animate-fade-in space-y-6 sm:space-y-10 pb-20 sm:pb-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter font-h1 text-white neon-glow">
            Command Center
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-body-sm tracking-wide">Monitor your orbital velocity and focus cycles.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Form & Quick Stats */}
        <div className="space-y-10 lg:col-span-1">
          {/* Form */}
          <div className="glass-panel p-8 relative overflow-hidden rounded-2xl border-white/5">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500"></div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white font-h1">
              <Plus className="text-cyan-400" /> Log Session
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest font-h3">Subject Area</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Theoretical Physics"
                  className="glass-input w-full py-3"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest font-h3">Duration (Min)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 60"
                  className="glass-input w-full py-3"
                  required
                  min="1"
                />
              </div>
              <button type="submit" className="primary-button w-full py-4 flex justify-center items-center gap-3">
                Initiate Focus <TrendingUp size={18} />
              </button>
            </form>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="glass-panel p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-all duration-300 border-white/5 group">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="text-cyan-400" size={24} />
              </div>
              <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-widest font-h3">Weekly Orbit</div>
              <div className="text-3xl font-bold text-white font-h1">{Math.round(totalWeeklyMinutes / 60 * 10) / 10}h</div>
            </div>
            <div className="glass-panel p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-all duration-300 border-white/5 group">
              <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Activity className="text-orange-500" size={24} />
              </div>
              <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-widest font-h3">Study Streak</div>
              <div className="text-3xl font-bold text-white font-h1">{analytics.streak || 0} Days</div>
            </div>
            <div className="glass-panel p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-all duration-300 border-white/5 group sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Book className="text-purple-400" size={24} />
              </div>
              <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-widest font-h3">Primary Subject</div>
              <div className="text-2xl font-bold text-white font-h1 truncate w-full px-2">{topSubject}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Charts */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Bar Chart */}
          <div className="glass-panel p-8 rounded-2xl border-white/5">
            <h3 className="text-xl font-bold mb-8 text-white font-h1 flex items-center gap-3">
              <span className="w-2 h-8 bg-cyan-500 rounded-full"></span>
              Weekly Momentum
            </h3>
            <div className="h-[350px] w-full">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center text-slate-400 animate-pulse">Scanning Bio-signals...</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={analytics.weekly}
                    onClick={handleBarClick}
                    style={{ cursor: 'pointer' }}
                  >
                    <XAxis 
                      dataKey="day" 
                      stroke="#475569" 
                      tickLine={false} 
                      axisLine={false} 
                      tick={{ fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis 
                      stroke="#475569" 
                      tickLine={false} 
                      axisLine={false} 
                      tick={{ fontSize: 12, fontWeight: 600 }}
                    />
                    <RechartsTooltip 
                      cursor={{ fill: 'rgba(34, 211, 238, 0.05)' }}
                      contentStyle={{ 
                        backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '16px',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                      }}
                    />
                    <Bar dataKey="duration" fill="#22d3ee" radius={[8, 8, 0, 0]}>
                      {analytics.weekly.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.date === selectedDate ? '#deb7ff' : '#22d3ee'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="glass-panel p-8 rounded-2xl border-white/5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h3 className="text-xl font-bold text-white font-h1 flex items-center gap-3">
                <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                Core Distribution
              </h3>
              <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-bold text-purple-300 uppercase tracking-widest">
                Viewing: {formatDateLabel(selectedDate)}
              </div>
            </div>
            <div className="h-[350px] w-full flex items-center justify-center">
              {dailyLoading ? (
                <div className="text-slate-400 animate-pulse">Mapping Neural Paths...</div>
              ) : dailySubjects.length === 0 ? (
                <div className="text-slate-500 font-body-md bg-white/5 px-6 py-3 rounded-full border border-white/5 flex flex-col items-center gap-2">
                  <span>No active flight data for this orbital period.</span>
                  <button 
                    onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                    className="text-cyan-400 text-xs hover:underline"
                  >
                    Return to Present
                  </button>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dailySubjects}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={8}
                      dataKey="duration"
                      nameKey="subject"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {dailySubjects.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '16px',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
