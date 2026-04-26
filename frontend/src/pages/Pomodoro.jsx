import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Play, Square, Save, RotateCcw } from 'lucide-react';

const API_URL = '/api';

const Pomodoro = () => {
  const { user } = useContext(AuthContext);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [subject, setSubject] = useState('');
  const [isBreak, setIsBreak] = useState(false);
  
  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (!isBreak) {
        handleSaveSession();
        setIsBreak(true);
        setTimeLeft(5 * 60);
      } else {
        setIsBreak(false);
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  const handleSaveSession = async () => {
    if (!subject || !user || isBreak) return;
    const durationLogged = 25 - Math.floor(timeLeft / 60);
    if (durationLogged <= 0) return;

    try {
      await fetch(`${API_URL}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ subject, duration: durationLogged }),
      });
    } catch (error) {
      console.error('Error logging session:', error);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto animate-fade-in pb-20 sm:pb-0">
      <div className="text-center mb-6 sm:mb-10 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-h1 neon-glow">Focus Engine</h2>
        <p className="text-slate-400 text-[10px] sm:text-sm font-body-sm tracking-wide uppercase">Precision interval tracking.</p>
      </div>

      <div className="glass-panel w-full p-6 sm:p-12 flex flex-col items-center rounded-2xl sm:rounded-3xl border-white/5 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isBreak ? 'from-green-400 to-cyan-400' : 'from-cyan-400 to-purple-500'}`}></div>
        
        <div className={`px-4 sm:px-6 py-1 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-6 sm:mb-10 border ${
          isBreak 
            ? 'bg-green-500/10 text-green-400 border-green-500/20' 
            : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
        }`}>
          {isBreak ? 'Cooling Down' : 'Active Orbit'}
        </div>
        
        <div className="text-7xl sm:text-[120px] font-black text-white tracking-tighter mb-8 sm:mb-12 tabular-nums leading-none font-h1 drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]">
          {String(minutes).padStart(2, '0')}<span className="text-cyan-400/50 animate-pulse">:</span>{String(seconds).padStart(2, '0')}
        </div>

        <div className="w-full max-w-xs sm:max-w-sm mb-8 sm:mb-12 space-y-3 sm:space-y-4 px-2">
          <label className="block text-center text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest font-h3">Objective</label>
          <input
            type="text"
            placeholder="e.g. Physics"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={isRunning || isBreak}
            className="glass-input w-full text-center py-3 sm:py-4 text-base sm:text-xl font-h3 placeholder:text-slate-700"
          />
        </div>

        <div className="flex gap-4 sm:gap-6">
          <button 
            onClick={toggleTimer}
            disabled={!subject && !isBreak}
            className={`primary-button flex items-center gap-2 sm:gap-3 px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl min-w-[150px] sm:min-w-[200px] justify-center ${
              !subject && !isBreak ? 'opacity-30 cursor-not-allowed scale-100' : ''
            }`}
          >
            {isRunning ? <><Square size={20} className="fill-current" /> Pause</> : <><Play size={20} className="fill-current" /> Engage</>}
          </button>
          
          <button 
            onClick={resetTimer}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 transition-all active:scale-95"
            title="Reset"
          >
            <RotateCcw size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>
        
        {!isBreak && !isRunning && timeLeft < 25 * 60 && (
          <button onClick={handleSaveSession} className="mt-8 sm:mt-12 text-cyan-400 hover:text-white flex items-center gap-2 font-h3 text-[10px] sm:text-sm uppercase tracking-widest transition-colors group">
            <Save size={16} className="group-hover:scale-110 transition-transform" /> Sync Partial Data
          </button>
        )}
      </div>
    </div>
  );
};

export default Pomodoro;
