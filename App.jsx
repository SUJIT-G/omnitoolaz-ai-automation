import React, { useState } from 'react';
import { 
  Home, CreditCard, CheckSquare, Share2, Calendar, Wand2, Users, 
  FileText, BarChart2, Settings, Menu, X, Sparkles, Image as ImageIcon 
} from 'lucide-react';

// --- OmniToolz AI Dashboard ---
// Yeh file aapke repo ke root mein 'App.jsx' ke naam se save hogi.

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('AI Post Generator');
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  // Yeh aapka working Cloudflare Worker URL hai (bina custom domain ke)
  const WORKER_URL = "https://omnitoolaz-ai-automation.devsujit.workers.dev/api/generate-post";

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

      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        alert("System Error: " + (data.error || "AI Engine not responding"));
      }
    } catch (err) {
      alert("Worker connection failed: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0B0A10] text-slate-200 overflow-hidden font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 bg-[#110F1A] border-r border-purple-900/30 flex-col">
        <div className="h-20 flex items-center px-6 border-b border-purple-900/30 gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-white">OmniToolz <span className="text-purple-400">AI</span></span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {['Home', 'AI Post Generator', 'My Plans', 'Settings'].map(item => (
            <button 
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item ? 'bg-purple-600/20 text-white border border-purple-500/30 shadow-lg shadow-purple-500/10' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-sm font-medium">{item}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-purple-900/30 flex items-center justify-between px-8 bg-[#0B0A10]/50 backdrop-blur-md">
          <h1 className="text-xl font-semibold text-white tracking-tight">{activeTab}</h1>
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider">
               Worker Online
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'AI Post Generator' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* AI Input Form */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-[#110F1A] border border-purple-900/30 rounded-2xl p-6 shadow-2xl">
                    <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Wand2 size={14} /> AI Configuration
                    </h2>
                    <div className="space-y-5">
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase block mb-2 tracking-wider">Social Platform</label>
                        <select 
                          value={platform} 
                          onChange={(e) => setPlatform(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-purple-500 transition-all cursor-pointer"
                        >
                          <option value="instagram">Instagram Feed</option>
                          <option value="linkedin">LinkedIn Professional</option>
                          <option value="twitter">Twitter (X) Viral</option>
                          <option value="whatsapp">WhatsApp Status</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase block mb-2 tracking-wider">Creative Prompt</label>
                        <textarea
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="Describe the image or topic you want to generate..."
                          className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-purple-500 resize-none transition-all placeholder:text-slate-600"
                        />
                      </div>
                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 text-white shadow-lg shadow-purple-600/20"
                      >
                        {isGenerating ? "Processing AI..." : "Generate Magic"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Result Preview */}
                <div className="lg:col-span-8">
                  <div className="bg-[#110F1A] border border-purple-900/30 rounded-3xl p-8 min-h-[550px] flex items-center justify-center relative shadow-2xl overflow-hidden">
                    {isGenerating ? (
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                        <p className="text-purple-400 font-medium animate-pulse tracking-wide italic">Stable Diffusion XL is painting...</p>
                      </div>
                    ) : result ? (
                      <div className="w-full grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                          <img src={result.imageUrl} alt="AI Art" className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <button onClick={() => window.open(result.imageUrl, '_blank')} className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-bold border border-white/20 text-white">Expand Image</button>
                          </div>
                        </div>
                        <div className="flex flex-col h-full">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-[11px] font-bold text-purple-400 uppercase tracking-widest">Viral Caption</h4>
                            <button 
                              onClick={() => navigator.clipboard.writeText(result.caption)}
                              className="text-[10px] text-slate-500 hover:text-white transition-colors flex items-center gap-1.5"
                            >
                              <FileText size={12} /> Copy
                            </button>
                          </div>
                          <div className="flex-1 bg-black/40 p-5 rounded-2xl border border-white/5 text-sm leading-relaxed text-slate-300 italic overflow-y-auto max-h-[300px] scrollbar-hide">
                            {result.caption}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-purple-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto border border-purple-500/20 text-purple-400 shadow-inner rotate-3 hover:rotate-0 transition-transform duration-500">
                          <ImageIcon size={40} />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-white text-lg font-medium tracking-tight">Ready for Creation</h3>
                          <p className="text-slate-500 max-w-xs mx-auto text-sm leading-relaxed">Describe your idea to generate high-quality images and captions using Meta Llama 3.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-40">
                <div className="text-center space-y-4">
                   <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-500">Module Locked</div>
                   <p className="text-slate-500 italic">This feature is coming soon to your dashboard.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Main Export
export default function App() {
  return <Dashboard />;
}
