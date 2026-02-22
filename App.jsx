import React, { useState, useEffect } from 'react';
import { 
  Home, CreditCard, CheckSquare, Share2, Calendar, Wand2, Users, FileText, 
  BarChart2, Settings, Menu, X, Sparkles, Image as ImageIcon, MessageSquare, 
  Clock, Instagram, Twitter, Linkedin, CheckCircle2, MoreVertical, Plus, 
  Play, Pause, RotateCcw, Send, Download, Copy, Trash2
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

  const handleNavClick = (tabName) => {
    setActiveTab(tabName);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#0B0A10] text-slate-200 font-sans overflow-hidden selection:bg-purple-500/30">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#110F1A] border-r border-purple-900/30
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-20 flex items-center px-6 border-b border-purple-900/30 bg-gradient-to-r from-purple-900/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">OmniToolz <span className="text-purple-400">AI</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
          <div className="space-y-1">
            {navItems.filter(i => i.section === 'main').map((item) => (
              <NavItem key={item.name} item={item} isActive={activeTab === item.name} onClick={() => handleNavClick(item.name)} />
            ))}
          </div>

          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Workspace</p>
            {navItems.filter(i => i.section === 'productivity').map((item) => (
              <NavItem key={item.name} item={item} isActive={activeTab === item.name} onClick={() => handleNavClick(item.name)} />
            ))}
          </div>

          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Share2 className="w-3 h-3" /> Social Automation
            </p>
            {navItems.filter(i => i.section === 'social').map((item) => (
              <NavItem key={item.name} item={item} isActive={activeTab === item.name} onClick={() => handleNavClick(item.name)} />
            ))}
          </div>

          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">System</p>
            {navItems.filter(i => i.section === 'settings').map((item) => (
              <NavItem key={item.name} item={item} isActive={activeTab === item.name} onClick={() => handleNavClick(item.name)} />
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-purple-900/30">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">OA</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Omni Agency</p>
              <p className="text-xs text-purple-400 truncate">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0B0A10] to-[#0B0A10]">
        <header className="h-20 border-b border-purple-900/30 flex items-center justify-between px-4 lg:px-8 bg-[#0B0A10]/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-white">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all">
              <Plus className="w-4 h-4" /> New Post
            </button>
            <div className="w-9 h-9 rounded-full bg-[#1A1825] border border-purple-500/30 flex items-center justify-center text-purple-400 cursor-pointer">
              <Clock className="w-4 h-4" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar relative">
          <div className="max-w-6xl mx-auto relative z-10">
            {activeTab === 'Home' && <DashboardHome />}
            {activeTab === 'AI Post Generator' && <AIPostGenerator />}
            {activeTab === 'Content Calendar' && <ContentCalendar />}
            {activeTab === 'Productivity Tools' && <ProductivityTools />}
            
            {['My Plans', 'Social Accounts', 'Automation Templates', 'Analytics', 'Settings'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center h-96 border border-dashed border-purple-900/50 rounded-2xl bg-[#110F1A]/50">
                <Sparkles className="w-12 h-12 text-purple-500/50 mb-4" />
                <h2 className="text-xl font-medium text-white mb-2">{activeTab}</h2>
                <p className="text-slate-400 text-center">Module connected to Cloudflare Workers API.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.2); border-radius: 10px; }
      `}} />
    </div>
  );
}

// --- SUB-COMPONENTS ---

function NavItem({ item, isActive, onClick }) {
  const Icon = item.icon;
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${isActive ? 'bg-purple-600/20 text-white border border-purple-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
      {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-purple-500 rounded-r-full" />}
      <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'group-hover:text-purple-400'}`} />
      <span className="font-medium text-sm">{item.name}</span>
    </button>
  );
}

function DashboardHome() {
  const stats = [
    { label: 'Posts Scheduled', value: '124', trend: '+12%', icon: Calendar, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'AI Images Generated', value: '856', trend: '+34%', icon: ImageIcon, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Accounts Connected', value: '8', trend: 'Stable', icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Focus Hours', value: '42h', trend: '+5h', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#110F1A] border border-purple-900/30 rounded-2xl p-6 hover:border-purple-500/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}><stat.icon className={`w-6 h-6 ${stat.color}`} /></div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-slate-300">{stat.trend}</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#110F1A] border border-purple-900/30 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Upcoming Schedule</h3>
          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-900 to-slate-800 flex items-center justify-center">
                  {item === 1 ? <Instagram className="w-6 h-6 text-pink-500" /> : <Twitter className="w-6 h-6 text-blue-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white truncate">AI Product Launch</h4>
                  <p className="text-sm text-slate-400 flex items-center gap-2"><Clock className="w-3 h-3" /> Today at 2:00 PM</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">Ready</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AIPostGenerator() {
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setTimeout(() => {
      setResult({
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
        caption: `🚀 Transform your workflow with the power of AI!\n\nStop wasting hours on manual content creation. Let OmniToolz handle the heavy lifting while you focus on scaling your business. #AI #Productivity #SaaS`,
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className="bg-[#110F1A] border border-purple-900/30 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" /> Create AI Post
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {['instagram', 'twitter', 'linkedin'].map((plat) => (
                <button key={plat} onClick={() => setPlatform(plat)} className={`p-3 rounded-xl border flex justify-center ${platform === plat ? 'bg-purple-500/20 border-purple-500/50 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                  {plat === 'instagram' && <Instagram className="w-5 h-5" />}
                  {plat === 'twitter' && <Twitter className="w-5 h-5" />}
                  {plat === 'linkedin' && <Linkedin className="w-5 h-5" />}
                </button>
              ))}
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your post..."
              className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-purple-500 outline-none resize-none"
            />
            <button onClick={handleGenerate} disabled={!prompt || isGenerating} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-medium disabled:opacity-50">
              {isGenerating ? "Generating..." : "Generate Magic"}
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 bg-[#110F1A] border border-purple-900/30 rounded-2xl p-6 min-h-[400px] flex flex-col items-center justify-center">
        {!result && !isGenerating ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4"><ImageIcon className="text-slate-600" /></div>
            <p className="text-slate-500 text-sm">Preview will appear here</p>
          </div>
        ) : isGenerating ? (
          <div className="flex flex-col items-center gap-4">
             <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
             <p className="text-purple-400 animate-pulse">AI is thinking...</p>
          </div>
        ) : (
          <div className="w-full space-y-4 animate-in fade-in duration-500">
            <img src={result.image} alt="Generated" className="w-full h-64 object-cover rounded-xl border border-white/10" />
            <div className="bg-black/40 p-4 rounded-xl border border-white/5 relative group">
              <p className="text-sm text-slate-300 whitespace-pre-wrap">{result.caption}</p>
              <button className="absolute top-2 right-2 p-2 bg-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Copy className="w-4 h-4 text-white" /></button>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center gap-2 border border-white/10 text-sm"><Download className="w-4 h-4" /> Download</button>
              <button className="flex-1 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg flex items-center justify-center gap-2 text-sm"><Send className="w-4 h-4" /> Schedule Now</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ContentCalendar() {
  return (
    <div className="bg-[#110F1A] border border-purple-900/30 rounded-2xl p-8 text-center">
       <Calendar className="w-12 h-12 text-purple-500/50 mx-auto mb-4" />
       <h3 className="text-xl font-semibold text-white">Visual Content Calendar</h3>
       <p className="text-slate-400 mt-2 max-w-sm mx-auto">Manage your social presence with a drag-and-drop interface.</p>
       <button className="mt-6 px-6 py-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">Open Full View</button>
    </div>
  );
}

function ProductivityTools() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div className="bg-gradient-to-br from-[#110F1A] to-purple-900/10 border border-purple-900/30 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-semibold text-white flex items-center gap-2"><Clock className="w-5 h-5 text-amber-400" /> Focus Timer</h3>
             <RotateCcw className="w-4 h-4 text-slate-500 cursor-pointer" />
          </div>
          <div className="text-5xl font-mono font-bold text-center text-white mb-6">25:00</div>
          <div className="flex gap-2">
             <button className="flex-1 py-3 bg-purple-600 rounded-xl flex items-center justify-center gap-2"><Play className="w-4 h-4" /> Start</button>
             <button className="px-4 py-3 bg-white/5 rounded-xl border border-white/10"><Pause className="w-4 h-4" /></button>
          </div>
       </div>
       <div className="bg-[#110F1A] border border-purple-900/30 rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><CheckSquare className="w-5 h-5 text-emerald-400" /> Daily Habits</h3>
          <div className="space-y-3">
             {['Post 1 Reel', 'Reply to DMs', 'Check Analytics'].map((task, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                   <div className="w-5 h-5 border-2 border-purple-500/50 rounded" />
                   <span className="text-sm text-slate-300">{task}</span>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}
