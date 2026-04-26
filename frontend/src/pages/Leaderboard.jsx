import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Trophy, Medal, Star } from 'lucide-react';

const API_URL = '/api';

const Leaderboard = () => {
  const { user } = useContext(AuthContext);
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${API_URL}/leaderboard`, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const data = await response.json();
        setLeaders(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [user]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 animate-pulse">
      <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-400 font-h3 tracking-widest uppercase">Calculating Standings...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-20 sm:pb-0">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white flex justify-center items-center gap-3 sm:gap-4 font-h1 neon-glow">
          Hall of Legends
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm font-body-sm tracking-wide uppercase mt-2">Top performers this week.</p>
      </div>

      <div className="glass-panel p-4 sm:p-8 rounded-2xl sm:rounded-3xl border-white/5 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"></div>
        
        <div className="space-y-3 sm:space-y-4">
          {leaders.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center gap-4">
              <Star className="text-slate-700" size={48} />
              <p className="text-slate-500 font-body-md">No orbital data detected.</p>
            </div>
          ) : (
            leaders.map((leader, index) => (
              <div 
                key={leader._id} 
                className={`flex items-center justify-between p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 border ${
                  leader._id === user.id || leader.name === user.name
                    ? 'bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="flex justify-center items-center w-8 h-8 sm:w-12 sm:h-12 font-bold text-xl sm:text-2xl">
                    {index === 0 ? <Trophy className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]" size={24} /> : 
                     index === 1 ? <Medal className="text-slate-300" size={24} /> : 
                     index === 2 ? <Medal className="text-amber-600" size={24} /> : 
                     <span className="text-slate-500 font-h1 text-sm sm:text-xl">{index + 1}</span>}
                  </div>
                  <div>
                    <div className="font-bold text-base sm:text-xl text-white font-h3 flex items-center gap-2">
                      {leader.name}
                      {(leader._id === user.id || leader.name === user.name) && (
                        <span className="text-[8px] sm:text-[10px] bg-cyan-500 text-slate-950 px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-tighter">You</span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 font-body-sm uppercase tracking-widest hidden sm:block">Active Voyager</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="text-right">
                    <span className="font-bold text-lg sm:text-2xl text-white font-h1">{Math.round(leader.duration / 60 * 10) / 10}</span>
                    <span className="text-cyan-400 text-[10px] sm:text-xs ml-1 font-h3 uppercase tracking-widest">Hrs</span>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 rounded-full flex items-center justify-center">
                    <Star className="text-purple-400" size={14} className="sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
