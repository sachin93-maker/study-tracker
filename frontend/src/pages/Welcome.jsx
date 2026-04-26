// import { Link } from 'react-router-dom';

// const Welcome = () => {
//   return (
//     <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950 min-h-screen font-body-md text-on-background overflow-x-hidden selection:bg-cyan-500/30">
//       {/* TopAppBar */}
//       <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 sm:px-10 py-4 sm:py-5 max-w-none bg-slate-950/30 backdrop-blur-xl border-b border-white/10 shadow-[0_20px_50px_rgba(34,211,238,0.1)]">
//         <div className="text-xl sm:text-2xl font-bold text-cyan-400 tracking-tighter font-h1">
//           Study Tracker
//         </div>
//         <div className="hidden lg:flex items-center gap-8">
//           <Link className="text-cyan-400 border-b-2 border-cyan-400 pb-1 font-h3 tracking-tight transition-all duration-300" to="/">Home</Link>

//         </div>
//         <Link className="px-5 sm:px-6 py-2 border-2 border-cyan-500 text-cyan-400 rounded-full font-bold scale-100 sm:scale-105 active:scale-95 transition-transform hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] text-sm sm:text-base" to="/auth">
//           Log In
//         </Link>
//       </nav>

//       {/* Hero Section */}
//       <main className="relative pt-32 sm:pt-48 pb-16 sm:pb-24 px-6 sm:px-10 max-w-7xl mx-auto flex flex-col items-center text-center animate-fade-in">
//         <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full sm:w-[800px] h-[400px] sm:h-[800px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
//         <h1 className="font-h1 text-4xl sm:text-7xl lg:text-[80px] text-white leading-[1.1] tracking-tighter neon-glow mb-6 sm:mb-8 animate-float">
//           Study at Zero-G.<br className="hidden sm:block" />Lift the Weight of Learning.
//         </h1>
//         <p className="max-w-2xl text-sm sm:text-lg font-body-lg text-slate-300 mb-8 sm:mb-12 px-2">
//           A student-centric ecosystem designed to automate your productivity. Track sessions, visualize your growth with AI-powered analytics, and master your subjects.
//         </p>
//         <Link className="bg-cyan-500 text-slate-950 px-8 sm:px-10 py-3 sm:py-4 rounded-full font-h3 flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(34,211,238,0.4)] group text-sm sm:text-lg" to="/auth">
//           Get Started for Free
//           <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
//         </Link>

//         {/* Background Element */}
//         <div className="mt-12 sm:mt-20 w-full relative">
//           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
//           <div className="rounded-xl overflow-hidden glass-card p-2 border border-white/5">
//             <img alt="Dashboard Preview" className="w-full h-[250px] sm:h-[400px] object-cover rounded-lg opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdvASAq-rsyv-vE0SHudZsfu2shiKBC_XWo570fIDsbwPOSvDyb0c-rHlVdRnOkEmG0GJ6i5RJmtfICfrD-1gKwwW356cETbOzlpRZiMeDA8LTaDTjZlLlwTdrRq6sPPVwIuLSI_Ff_ymc4q9wQssFCiaI2KYBjpgi43yGfkAU2DH-dFzf9nGb_cbK6ZIUZrruCXQvNNTbT9BDjDd4gTWwhg68rtf1En4jo5eZOxmVpYSFw6CBNzplAj_3pnzSMsTZPHkOj1Lt4dQ" />
//           </div>
//         </div>
//       </main>

//       {/* Three Pillars Section */}
//       <section className="py-16 sm:py-24 px-6 sm:px-10 max-w-7xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
//           {/* Pillar 1 */}
//           <div className="glass-card p-6 sm:p-8 rounded-xl flex flex-col gap-4 group">
//             <div className="w-12 h-12 sm:w-14 sm:h-14 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400">
//               <span className="material-symbols-outlined text-2xl sm:text-3xl">analytics</span>
//             </div>
//             <h3 className="text-xl sm:text-2xl font-h2 text-white">Analyze</h3>
//             <p className="text-sm sm:text-base font-body-md text-slate-300">
//               Deep dive into your study patterns with neural-engine analytics that pinpoint exactly where your focus drifts.
//             </p>
//             <div className="mt-auto pt-4 flex items-center text-cyan-400 gap-1 font-label-caps opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-xs">
//               VIEW INSIGHTS <span className="material-symbols-outlined text-sm">chevron_right</span>
//             </div>
//           </div>
//           {/* Pillar 2 */}
//           <div className="glass-card p-6 sm:p-8 rounded-xl flex flex-col gap-4 group animate-float" style={{ animationDelay: '1s' }}>
//             <div className="w-12 h-12 sm:w-14 sm:h-14 bg-secondary-container/30 rounded-full flex items-center justify-center text-secondary">
//               <span className="material-symbols-outlined text-2xl sm:text-3xl">psychology</span>
//             </div>
//             <h3 className="text-xl sm:text-2xl font-h2 text-white">Optimize</h3>
//             <p className="text-sm sm:text-base font-body-md text-slate-300">
//               AI-powered session scheduling that adapts to your circadian rhythms for peak cognitive performance.
//             </p>
//             <div className="mt-auto pt-4 flex items-center text-secondary gap-1 font-label-caps opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-xs">
//               OPTIMIZE FLOW <span className="material-symbols-outlined text-sm">chevron_right</span>
//             </div>
//           </div>
//           {/* Pillar 3 */}
//           <div className="glass-card p-6 sm:p-8 rounded-xl flex flex-col gap-4 group">
//             <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-full flex items-center justify-center text-white">
//               <span className="material-symbols-outlined text-2xl sm:text-3xl">timer</span>
//             </div>
//             <h3 className="text-xl sm:text-2xl font-h2 text-white">Excel</h3>
//             <p className="text-sm sm:text-base font-body-md text-slate-300">
//               Master complex subjects in half the time using weightless spaced-repetition loops and active recall.
//             </p>
//             <div className="mt-auto pt-4 flex items-center text-white gap-1 font-label-caps opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-xs">
//               MASTER TOPICS <span className="material-symbols-outlined text-sm">chevron_right</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Content Feature */}
//       <section className="py-16 sm:py-24 px-6 sm:px-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 sm:gap-20 items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
//         <div className="order-2 md:order-1">
//           <div className="relative">
//             <div className="absolute -inset-4 bg-cyan-500/20 blur-2xl rounded-full"></div>
//             <img alt="Feature Concept" className="relative w-full aspect-square object-cover rounded-xl border border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw6T0c5Ua0HJsR7y3e3kiphQUePiyr3wgXuUdntF8zAwRYVIRsNbKvvKORxsaBKUM-_LhC11O_JIE_b4uWdQPh_HJkHLOQSIBFIIvFry8BbFr5YkqPrzUCMQpRH66o4OF5xI7r3kecaHzSonxotZ9vZrU005pkEQg5o75cBVkIXms4hjPkjDXQ8Wcoc6fn8oPboG3jDfME4O22T1EzvBY72cXF3UPsRARfRzGoUPIUuSCzTXubQhI2dYq7Jqe_5cfpuCQ9bX-w_-c" />
//           </div>
//         </div>
//         <div className="order-1 md:order-2 flex flex-col gap-4 sm:gap-6">
//           <span className="font-label-caps text-cyan-400 text-xs tracking-widest">THE ORBITAL PHILOSOPHY</span>
//           <h2 className="text-3xl sm:text-5xl font-h1 text-white leading-tight">Designed for digital natives.</h2>
//           <p className="text-sm sm:text-lg font-body-lg text-slate-300">
//             Traditional education feels like gravity—heavy, slow, and pulling you down. We’ve rebuilt the study experience from the ground up to feel as weightless as orbital flight.
//           </p>
//           <ul className="space-y-3 mt-2">
//             <li className="flex items-center gap-3 text-slate-300 text-sm sm:text-base">
//               <span className="material-symbols-outlined text-cyan-400 text-xl">check_circle</span>
//               Zero-latency interface for rapid capturing
//             </li>
//             <li className="flex items-center gap-3 text-slate-300 text-sm sm:text-base">
//               <span className="material-symbols-outlined text-cyan-400 text-xl">check_circle</span>
//               Context-aware study focus modes
//             </li>
//             <li className="flex items-center gap-3 text-slate-300 text-sm sm:text-base">
//               <span className="material-symbols-outlined text-cyan-400 text-xl">check_circle</span>
//               Bioluminescence theme for eye comfort
//             </li>
//           </ul>
//         </div>
//       </section>

//       {/* Floating Action Button */}
//       <button className="fixed bottom-24 right-6 sm:bottom-10 sm:right-10 w-14 h-14 sm:w-16 sm:h-16 bg-cyan-400 text-slate-950 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-110 active:scale-95 transition-transform z-40 animate-float">
//         <span className="material-symbols-outlined text-2xl sm:text-3xl">bolt</span>
//       </button>

//       {/* Footer */}
//       <footer className="w-full py-10 px-6 sm:px-10 flex flex-col md:flex-row justify-between items-center gap-8 bg-slate-950/50 backdrop-blur-lg border-t border-white/5 mb-16 sm:mb-0">
//         <div className="flex flex-col items-center md:items-start gap-2">
//           <div className="text-cyan-400 font-bold font-h1 text-lg sm:text-xl">Study Tracker</div>
//           <div className="font-h3 text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 opacity-80 text-center md:text-left">
//             © 2024 Study Tracker. Designed for digital natives.
//           </div>
//         </div>
//         <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
//           <a className="font-h3 text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors" href="#">Privacy</a>
//           <a className="font-h3 text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors" href="#">Terms</a>
//           <a className="font-h3 text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors" href="#">Support</a>
//           <a className="font-h3 text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors" href="#">Careers</a>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Welcome;

import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950 min-h-screen font-body-md text-on-background overflow-x-hidden selection:bg-cyan-500/30">
      {/* TopAppBar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 sm:px-10 py-4 sm:py-5 max-w-none bg-slate-950/30 backdrop-blur-xl border-b border-white/10 shadow-[0_20px_50px_rgba(34,211,238,0.1)]">
        <div className="text-xl sm:text-2xl font-bold text-cyan-400 tracking-tighter font-h1">
          Study Tracker
        </div>

        {/* Navigation removed as per request */}

        <Link className="px-5 sm:px-6 py-2 border-2 border-cyan-500 text-cyan-400 rounded-full font-bold scale-100 sm:scale-105 active:scale-95 transition-transform hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] text-sm sm:text-base" to="/auth">
          Log In
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 sm:pt-48 pb-16 sm:pb-24 px-6 sm:px-10 max-w-7xl mx-auto flex flex-col items-center text-center animate-fade-in">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full sm:w-[800px] h-[400px] sm:h-[800px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <h1 className="font-h1 text-4xl sm:text-7xl lg:text-[80px] text-white leading-[1.1] tracking-tighter neon-glow mb-6 sm:mb-8 animate-float">
          Study at Zero-G.<br className="hidden sm:block" />Lift the Weight of Learning.
        </h1>
        <p className="max-w-2xl text-sm sm:text-lg font-body-lg text-slate-300 mb-8 sm:mb-12 px-2">
          A student-centric ecosystem designed to automate your productivity. Track sessions, visualize your growth with AI-powered analytics, and master your subjects.
        </p>
        <Link className="bg-cyan-500 text-slate-950 px-8 sm:px-10 py-3 sm:py-4 rounded-full font-h3 flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(34,211,238,0.4)] group text-sm sm:text-lg" to="/auth">
          Get Started for Free
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </Link>

        {/* Background Element - Custom Image Section */}
        <div className="mt-12 sm:mt-20 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
          <div className="rounded-xl overflow-hidden glass-card p-2 border border-white/5 h-[400px]">
            <img
              alt="Dashboard Preview"
              className="w-full h-full object-cover rounded-lg opacity-80"
              src={dashboardImg}
            />
          </div>
        </div>
      </main>

      {/* Three Pillars Section */}
      <section className="py-16 sm:py-24 px-6 sm:px-10 max-w-7xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Analytics Card */}
          <div className="glass-card p-6 sm:p-8 rounded-xl flex flex-col gap-4 group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400">
              <span className="material-symbols-outlined text-2xl sm:text-3xl">monitoring</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-h2 text-white">Smart Analytics</h3>
            <p className="text-sm sm:text-base font-body-md text-slate-300">
              Get detailed insights into your study time spent per subject. Visualize your progress with interactive charts and identify your strengths.
            </p>
            <div className="mt-auto pt-4 flex items-center text-cyan-400 gap-1 font-label-caps opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-xs">
              TRACK GROWTH <span className="material-symbols-outlined text-sm">chevron_right</span>
            </div>
          </div>

          {/* AI Assistant Card */}
          <div className="glass-card p-6 sm:p-8 rounded-xl flex flex-col gap-4 group animate-float" style={{ animationDelay: '1s' }}>
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400">
              <span className="material-symbols-outlined text-2xl sm:text-3xl">smart_toy</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-h2 text-white">AI Assistant</h3>
            <p className="text-sm sm:text-base font-body-md text-slate-300">
              Stuck on a concept? Your AI study partner is here to explain complex topics and help you structure your learning path effectively.
            </p>
            <div className="mt-auto pt-4 flex items-center text-purple-400 gap-1 font-label-caps opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-xs">
              ASK ASSISTANT <span className="material-symbols-outlined text-sm">chevron_right</span>
            </div>
          </div>

          {/* Leaderboard Card */}
          <div className="glass-card p-6 sm:p-8 rounded-xl flex flex-col gap-4 group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400">
              <span className="material-symbols-outlined text-2xl sm:text-3xl">leaderboard</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-h2 text-white">Competitive Edge</h3>
            <p className="text-sm sm:text-base font-body-md text-slate-300">
              Stay motivated with a global leaderboard. Compete with peers, climb the ranks, and turn your study sessions into a winning streak.
            </p>
            <div className="mt-auto pt-4 flex items-center text-amber-400 gap-1 font-label-caps opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-xs">
              VIEW RANKINGS <span className="material-symbols-outlined text-sm">chevron_right</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Feature */}
      <section className="py-16 sm:py-24 px-6 sm:px-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 sm:gap-20 items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="order-2 md:order-1">
          <div className="relative">
            <div className="absolute -inset-4 bg-cyan-500/20 blur-2xl rounded-full"></div>
            <img alt="Feature Concept" className="relative w-full aspect-square object-cover rounded-xl border border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw6T0c5Ua0HJsR7y3e3kiphQUePiyr3wgXuUdntF8zAwRYVIRsNbKvvKORxsaBKUM-_LhC11O_JIE_b4uWdQPh_HJkHLOQSIBFIIvFry8BbFr5YkqPrzUCMQpRH66o4OF5xI7r3kecaHzSonxotZ9vZrU005pkEQg5o75cBVkIXms4hjPkjDXQ8Wcoc6fn8oPboG3jDfME4O22T1EzvBY72cXF3UPsRARfRzGoUPIUuSCzTXubQhI2dYq7Jqe_5cfpuCQ9bX-w_-c" />
          </div>
        </div>
        <div className="order-1 md:order-2 flex flex-col gap-4 sm:gap-6">
          <span className="font-label-caps text-cyan-400 text-xs tracking-widest">THE ORBITAL PHILOSOPHY</span>
          <h2 className="text-3xl sm:text-5xl font-h1 text-white leading-tight">Designed for digital natives.</h2>
          <p className="text-sm sm:text-lg font-body-lg text-slate-300">
            Traditional education feels like gravity—heavy, slow, and pulling you down. We’ve rebuilt the study experience from the ground up to feel as weightless as orbital flight.
          </p>
          <ul className="space-y-3 mt-2">
            <li className="flex items-center gap-3 text-slate-300 text-sm sm:text-base">
              <span className="material-symbols-outlined text-cyan-400 text-xl">check_circle</span>
              Deep dive subject analytics
            </li>
            <li className="flex items-center gap-3 text-slate-300 text-sm sm:text-base">
              <span className="material-symbols-outlined text-cyan-400 text-xl">check_circle</span>
              Real-time competitive leaderboard
            </li>
            <li className="flex items-center gap-3 text-slate-300 text-sm sm:text-base">
              <span className="material-symbols-outlined text-cyan-400 text-xl">check_circle</span>
              AI-driven study support
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-10 px-6 sm:px-10 flex flex-col md:flex-row justify-between items-center gap-8 bg-slate-950/50 backdrop-blur-lg border-t border-white/5 mb-16 sm:mb-0">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-cyan-400 font-bold font-h1 text-lg sm:text-xl">Study Tracker</div>
          <div className="font-h3 text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 opacity-80 text-center md:text-left">
            © 2026 Study Tracker. Designed for students.
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          <a className="font-h3 text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors" href="#">Privacy</a>
          <a className="font-h3 text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors" href="#">Terms</a>
          <a className="font-h3 text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors" href="#">Support</a>
          <a className="font-h3 text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors" href="#">Careers</a>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;