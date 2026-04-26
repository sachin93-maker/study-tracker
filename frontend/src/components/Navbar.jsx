import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Timer, Trophy, BrainCircuit } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Pomodoro', path: '/pomodoro', icon: <Timer size={20} /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy size={20} /> },
    { name: 'AI Tutor', path: '/tutor', icon: <BrainCircuit size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 sm:static sm:mt-6 p-2 sm:rounded-full flex justify-around sm:justify-center gap-1 sm:gap-4 z-50 bg-slate-900/80 sm:bg-transparent backdrop-blur-2xl sm:backdrop-blur-none border-t sm:border border-white/5 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] sm:shadow-none">
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2 rounded-xl sm:rounded-full transition-all duration-300 font-h3 tracking-tight flex-1 sm:flex-none ${
            location.pathname === link.path
              ? 'bg-cyan-500/10 sm:bg-cyan-500 text-cyan-400 sm:text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.2)] sm:shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-105 sm:scale-105'
              : 'text-slate-400 hover:text-cyan-300 hover:bg-white/5'
          }`}
        >
          <span className="sm:scale-100">{link.icon}</span>
          <span className="text-[10px] sm:text-base uppercase sm:normal-case font-bold sm:font-normal">{link.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
