import React, { useState, useEffect } from 'react';
import { 
  Home, CreditCard, CheckSquare, Share2, Calendar, Wand2, Users, 
  FileText, BarChart2, Settings, Menu, X, Sparkles, Image as ImageIcon,
  MessageSquare, Clock, Instagram, Twitter, Linkedin, CheckCircle2,
  RotateCcw, Plus, Play, Pause
} from 'lucide-react';

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [activeTab, setActiveTab] = useState('AI Post Generator');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: Home, section: 'main' },
    { name: 'My Plans', icon: CreditCard, section: 'main' },
    { name: 'Productivity Tools', icon: CheckSquare, section: 'productivity' },
    { name: 'Content Calendar', icon: Calendar, section: 'social' },
    { name: 'AI Post Generator', icon: Wand2, section: 'social' },
    { name: 'Social Accounts', icon: Users, section: 'social' },
    { name: 'Automation Templates', icon: FileText, section: 'social' },
    { name: 'Analytics', icon: BarChart2, section: 'settings' },
    { name: 'Settings', icon: Settings, section: 'settings' },
  ];

  return (
    <div className="flex h-screen bg-[#0B0A10] text-slate-200 font-sans overflow-hidden">
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#110F1A] border-r border-purple-900/30 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
        <div className="h-20 flex items-center px-6 border-b border-purple-900/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">OmniToolz <span className="text-purple-400">AI</span></span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
          {navItems.map(item => (
            <button key={item.name} onClick={() => {setActiveTab(item.name); setIsMobileMenuOpen(false)}} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeTab === item.name ? 'bg-purple-600/20 text-white border border-purple-500/30' : 'text-slate-400 hover:text-white'}`}>
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-[#0B0A10]">
        <header className="h-20 border-b border-purple-900/30 flex items-center justify-between px-8 bg-[#0B0A10]/50 backdrop-blur-md">
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2"><Menu /></button>
          <h1 className="text-xl font-semibold">{activeTab}</h1>
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider">System Live</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'AI Post Generator' ? <AIPostGenerator /> : <div className="text-center py-20 text-slate-500 italic">Module loading from repository...</div>}
          </div>
        </div>
      </main>
    </div>
  );
}

function AIPostGenerator() {
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  // UPDATE: Ab hum aapka naya custom domain use kar rahe hain
  const WORKER_URL = "https://ai.omnitoolz.in/api/generate-post";

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setResult(null);

    try {
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, platform }),
      });

      // Agar domain setup mein galti hogi toh yahan error aayega
      if (!response.ok) throw new Error("API not responding on ai.omnitoolz.in");

      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Connection Error: " + err.message + ". Check if Custom Domain is active in Worker settings.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-[#110F1A] border border-purple-900/30 rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
            <Wand2 className="w-5 h-5 text-purple-400" /> Post Creator
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Platform</label>
              <select 
                value={platform} 
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-purple-500"
              >
                <option value="instagram">Instagram</option>
                <option value="pinterest">Pinterest</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="telegram">Telegram</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="What should the AI create?"
                className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-purple-500 resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-xl font-bold text-sm hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50"
            >
              {isGenerating ? "Processing AI..." : "Generate Post"}
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8">
        <div className="bg-[#110F1A] border border-purple-900/30 rounded-3xl p-8 min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
          {isGenerating ? (
            <div className="text-center animate-pulse">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-purple-400 font-medium">Crafting your content...</p>
            </div>
          ) : result ? (
            <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="grid md:grid-cols-2 gap-8">
                <img src={result.imageUrl} className="rounded-2xl border border-white/10 shadow-2xl w-full aspect-square object-cover" />
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest">Generated Caption</h4>
                  <div className="bg-black/40 p-5 rounded-2xl border border-white/5 text-sm leading-relaxed text-slate-300 italic h-64 overflow-y-auto">
                    {result.caption}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-purple-500/10 rounded-3xl flex items-center justify-center mx-auto border border-purple-500/20 text-purple-400">
                <ImageIcon size={40} />
              </div>
              <p className="text-slate-500 max-w-xs mx-auto text-sm">Your AI-generated image and caption will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
