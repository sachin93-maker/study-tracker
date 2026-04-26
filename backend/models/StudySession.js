const mongoose = require('mongoose');

const studySessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional for mock fallback, required in production
  userIdFallback: { type: String }, // Used when mock db is active
  subject: { type: String, required: true },
  duration: { type: Number, required: true }, // duration in minutes
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudySession', studySessionSchema);
