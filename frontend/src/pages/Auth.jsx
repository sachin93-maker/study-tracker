import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const API_URL = '/api/auth';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/login' : '/register';

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Server rejected request.');
        }

        login(data);
        navigate('/dashboard');
      } else {
        const text = await response.text();
        console.error('Invalid Server Response:', text);
        throw new Error(`Server returned invalid format: ${text.substring(0, 50)}...`);
      }
    } catch (err) {
      console.error('Auth Request Failed:', err);
      setError(err.message === 'Failed to fetch' 
        ? 'Cannot connect to server. Is the backend running?' 
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950 min-h-screen font-body-md text-on-background flex flex-col">
      <nav className="p-6 sm:p-10 flex justify-between items-center w-full">
        <Link to="/" className="text-xl sm:text-2xl font-bold text-cyan-400 tracking-tighter font-h1 neon-glow">
          Study Tracker
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative animate-fade-in">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-[600px] h-[400px] sm:h-[600px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="glass-panel p-6 sm:p-10 w-full max-w-md relative overflow-hidden rounded-2xl border-white/5">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500"></div>
          
          <h2 className="text-4xl font-bold mb-2 text-center text-white font-h1">
            {isLogin ? 'Welcome Back' : 'Join the Orbit'}
          </h2>
          <p className="text-center text-slate-400 mb-8 font-body-sm">
            {isLogin ? 'Enter your credentials' : 'Create a new account'}
          </p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 font-h3 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="glass-input w-full py-3 px-4"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 font-h3 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="glass-input w-full py-3 px-4"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 font-h3 uppercase tracking-wider">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className="glass-input w-full py-3 px-4"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="primary-button w-full mt-4 py-4 text-lg disabled:opacity-50 disabled:scale-100"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            {isLogin ? "New to Study Tracker? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-cyan-400 font-bold hover:underline">
              {isLogin ? 'Sign up here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
