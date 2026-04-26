import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';
import { LogOut } from 'lucide-react';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="min-h-screen relative z-10 flex flex-col bg-slate-950/20">
      <header className="px-4 sm:px-10 py-4 sm:py-5 flex justify-between items-center w-full bg-slate-950/30 backdrop-blur-xl border-b border-white/10 shadow-[0_20px_50px_rgba(34,211,238,0.1)]">
        <h1 className="text-xl sm:text-2xl font-bold text-cyan-400 tracking-tighter font-h1 neon-glow">
          Study Tracker
        </h1>
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex flex-col items-end">
            <span className="text-slate-300 text-[10px] sm:text-sm font-body-sm hidden xs:block">Welcome back,</span>
            <span className="text-white text-sm sm:text-base font-bold font-h3">{user.name}</span>
          </div>
          <button 
            onClick={logout} 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all active:scale-95"
            title="Logout"
          >
            <LogOut size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-10">
        <Navbar />
      </div>
      
      <main className="flex-1 p-4 sm:p-10 max-w-7xl mx-auto w-full mb-20 sm:mb-0">
        <Outlet />
      </main>

      <footer className="w-full py-6 sm:py-8 px-4 sm:px-10 text-center border-t border-white/5 bg-slate-950/50 backdrop-blur-lg hidden sm:block">
        <p className="font-h3 text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 opacity-60">
          © 2024 Study Tracker. Orbital productivity engine.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
