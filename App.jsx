import React, { useState } from 'react';
import { 
  Home, CreditCard, CheckSquare, Share2, Calendar, Wand2, Users, 
  FileText, BarChart2, Settings, Menu, X, Sparkles, Image as ImageIcon 
} from 'lucide-react';

/**
 * OmniToolz AI Dashboard
 * Fix: 'process.env' ya direct string use kiya gaya hai 'import.meta' ki jagah 
 * taaki legacy environments mein error na aaye.
 */

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('AI Post Generator');
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  // Fallback URL directly defined to avoid 'import.meta' issues in some build targets
  const WORKER_BASE_URL = "https://omnitoolaz-ai-automation.devsujit.workers.dev";
  const WORKER_URL = `${WORKER_BASE_URL}/api/generate-post`;

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setResult(null);

    try {
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        mode: 'cors', 
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ prompt, platform }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP Error ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        alert("AI Error: " + (data.error || "Generation failed"));
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      alert(`Connection Error!\nURL: ${WORKER_URL}\nMessage: ${err.message}\n\nTip: Worker mein CORS enabled hona chahiye.`);
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

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-purple-900/30 flex items-center justify-between px-8 bg-[#0B0A10]/50 backdrop-blur-md">
          <h1 className="text-xl font-semibold text-white tracking-tight">{activeTab}</h1>
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider">
               Worker Synced
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-6xl mx-auto text-center">
            {activeTab === 'AI Post Generator' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                {/* AI Input Form */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-[#110F1A] border border-purple-900/30 rounded-2xl p-6 shadow-2xl">
                    <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Wand2 size={14} /> Design Studio
                    </h2>
                    <div className="space-y-5">
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase block mb-2 tracking-wider text-left">Platform</label>
                        <select 
                          value={platform} 
                          onChange={(e) => setPlatform(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-purple-500"
                        >
                          <option value="instagram">Instagram</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="twitter">Twitter (X)</option>
                          <option value="whatsapp">WhatsApp</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase block mb-2 tracking-wider text-left">Prompt</label>
                        <textarea
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="Apna idea likhein... AI ise visualize karega"
                          className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-purple-500 resize-none"
                        />
                      </div>
                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 text-white shadow-lg shadow-purple-500/20"
                      >
                        {isGenerating ? "Igniting Engines..." : "Ignite AI Engines"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Result Preview */}
                <div className="lg:col-span-8">
                  <div className="bg-[#110F1A] border border-purple-900/30 rounded-3xl p-8 min-h-[550px] flex items-center justify-center relative shadow-2xl">
                    {isGenerating ? (
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                        <p className="text-purple-400 font-medium animate-pulse tracking-wide">AI soch raha hai...</p>
                      </div>
                    ) : result ? (
                      <div className="w-full grid md:grid-cols-2 gap-8 animate-in fade-in zoom-in duration-500">
                        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                          <img src={result.imageUrl} alt="AI Art" className="w-full aspect-square object-cover" />
                        </div>
                        <div className="flex flex-col h-full text-left">
                          <h4 className="text-[11px] font-bold text-purple-400 uppercase tracking-widest mb-4">Generated Caption</h4>
                          <div className="flex-1 bg-black/40 p-5 rounded-2xl border border-white/5 text-sm leading-relaxed text-slate-300 italic overflow-y-auto max-h-[300px]">
                            {result.caption}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-purple-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto border border-purple-500/20 text-purple-400">
                          <ImageIcon size={40} />
                        </div>
                        <p className="text-slate-500 max-w-xs mx-auto text-sm leading-relaxed">Apne ideas ko haseen images aur viral captions mein badlein.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-40 text-slate-500 italic">Yeh module jald hi shuru hoga.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return <Dashboard />;
}
