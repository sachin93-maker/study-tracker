import { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BrainCircuit, Send, User, Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const API_URL = '/api';

const Tutor = () => {
  const { user } = useContext(AuthContext);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hello! I am your AI Study Assistant. I can help explain concepts, solve complex problems step-by-step, or test your knowledge. What are we studying today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || !user) return;

    const userMessage = { role: 'user', text: prompt };
    
    const history = messages.slice(1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    setMessages(prev => [...prev, userMessage]);
    setPrompt('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/tutor/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ 
          prompt: userMessage.text,
          history 
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, { role: 'model', text: data.text }]);
    } catch (error) {
      console.error('AI Tutor Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: `Error: ${error.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] sm:h-[75vh] max-w-4xl mx-auto animate-fade-in pb-20 sm:pb-0">
      <div className="text-center mb-6 sm:mb-10">
        <h2 className="text-2xl sm:text-4xl font-bold text-white flex justify-center items-center gap-3 sm:gap-4 font-h1 neon-glow">
          Neural Interface
        </h2>
        <p className="text-slate-400 text-[10px] sm:text-sm font-body-sm tracking-wide uppercase mt-1 sm:mt-2">Connect to the planetary knowledge base.</p>
      </div>

      <div className="flex-1 glass-panel rounded-2xl sm:rounded-3xl border-white/5 flex flex-col overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"></div>
        
        <div className="flex-1 overflow-y-auto space-y-4 sm:space-y-8 p-4 sm:p-8 custom-scrollbar pb-6 bg-slate-950/20">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-3 sm:gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110 ${
                msg.role === 'model' 
                  ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                  : 'bg-purple-500/10 border border-purple-500/30 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
              }`}>
                {msg.role === 'model' ? <Bot size={18} className="sm:w-6 sm:h-6" /> : <User size={18} className="sm:w-6 sm:h-6" />}
              </div>
              
              <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl max-w-[90%] sm:max-w-[85%] text-sm sm:text-lg leading-relaxed shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-purple-500/20 border border-purple-500/30 text-white rounded-tr-none font-h3' 
                  : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none font-body-md markdown-content'
              }`}>
                {msg.role === 'model' ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm, remarkMath]} 
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 text-cyan-400 font-h1" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3 text-cyan-400 font-h1" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2 text-cyan-400 font-h1" {...props} />,
                      p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="marker:text-cyan-400" {...props} />,
                      code: ({node, inline, ...props}) => 
                        inline 
                          ? <code className="bg-white/10 px-1.5 py-0.5 rounded text-cyan-300" {...props} />
                          : <code className="block bg-black/30 p-4 rounded-xl border border-white/5 my-4 overflow-x-auto text-cyan-300" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-cyan-500/50 pl-4 py-1 italic mb-4 bg-cyan-500/5 rounded-r-lg" {...props} />,
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 sm:gap-6 justify-start animate-pulse">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                <Bot size={18} className="text-cyan-400 sm:w-6 sm:h-6" />
              </div>
              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-cyan-400 rounded-tl-none flex items-center gap-2 sm:gap-3 font-h3 italic text-xs sm:text-base">
                <Loader2 size={16} className="animate-spin sm:w-5 sm:h-5" /> Synthesizing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md border-t border-white/5 flex gap-2 sm:gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Query AI..."
            className="glass-input flex-1 py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-lg rounded-xl sm:rounded-2xl border-white/10 focus:border-cyan-400/50"
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={loading || !prompt.trim()}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-cyan-500 text-slate-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] disabled:opacity-30"
          >
            <Send size={20} className="sm:w-7 sm:h-7" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tutor;
