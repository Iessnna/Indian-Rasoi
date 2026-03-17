import React, { useState } from 'react';
import { Send, Sparkles, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { getChefAdvice } from '../services/gemini';

interface Message {
  role: 'user' | 'chef';
  text: string;
}

export const ChefAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'chef', text: "Hello! I'm your AI Chef Assistant. Ask me anything about cooking, techniques, or ingredient substitutions!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const advice = await getChefAdvice(userMsg);
      setMessages(prev => [...prev, { role: 'chef', text: advice }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'chef', text: "I'm sorry, I hit a snag in the kitchen. Could you try asking again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-[32px] shadow-lg border border-brand-magenta/10 flex flex-col h-[600px]">
      <div className="p-6 border-b border-brand-magenta/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-magenta flex items-center justify-center text-white shadow-lg shadow-brand-magenta/20">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="font-serif font-semibold text-lg text-brand-magenta">Chef Assistant</h3>
          <p className="text-xs text-brand-ink/50 uppercase tracking-widest font-bold">Real-time Culinary Advice</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-brand-indigo text-white' : 'bg-brand-magenta/10 text-brand-magenta'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-brand-indigo text-white' : 'bg-brand-magenta/5 text-brand-ink'}`}>
                  <div className="markdown-body">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-brand-magenta/5 p-4 rounded-2xl flex gap-2">
              <div className="w-2 h-2 bg-brand-magenta/40 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-brand-magenta/40 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-brand-magenta/40 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-brand-magenta/10">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="w-full px-6 py-4 bg-brand-cream/50 border border-brand-magenta/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-magenta/20 pr-14"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-brand-magenta text-white rounded-xl hover:bg-brand-indigo disabled:opacity-50 transition-all shadow-lg"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
