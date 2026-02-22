import React, { useState, useEffect } from 'react';
import { 
  Home, 
  CreditCard, 
  CheckSquare, 
  Share2, 
  Calendar, 
  Wand2, 
  Users, 
  FileText, 
  BarChart2, 
  Settings, 
  Menu, 
  X, 
  Sparkles,
  Image as ImageIcon,
  MessageSquare,
  Clock,
  Instagram,
  Twitter,
  Linkedin,
  CheckCircle2,
  MoreVertical,
  Plus,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [activeTab, setActiveTab] = useState('AI Post Generator');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation schema
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
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-purple-900/30 bg-gradient-to-r from-purple-900/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">OmniToolz <span className="text-purple-400">AI</span></span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
          
          {/* Main Section */}
          <div className="space-y-1">
            {navItems.filter(i => i.section === 'main').map((item) => (
              <NavItem 
                key={item.name} 
                item={item} 
                isActive={activeTab === item.name} 
                onClick={() => handleNavClick(item.name)} 
              />
            ))}
          </div>

          {/* Productivity */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Workspace</p>
            {navItems.filter(i => i.section === 'productivity').map((item) => (
              <NavItem 
                key={item.name} 
                item={item} 
                isActive={activeTab === item.name} 
                onClick={() => handleNavClick(item.name)} 
              />
            ))}
          </div>

          {/* Social Automation */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Share2 className="w-3 h-3" /> Social Automation
            </p>
            {navItems.filter(i => i.section === 'social').map((item) => (
              <NavItem 
                key={item.name} 
                item={item} 
                isActive={activeTab === item.name} 
                onClick={() => handleNavClick(item.name)} 
              />
            ))}
          </div>

          {/* Settings */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">System</p>
            {navItems.filter(i => i.section === 'settings').map((item) => (
              <NavItem 
                key={item.name} 
                item={item} 
                isActive={activeTab === item.name} 
                onClick={() => handleNavClick(item.name)} 
              />
            ))}
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-purple-900/30">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" 
              alt="User" 
              className="w-10 h-10 rounded-full border border-purple-500/30 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Omni Agency</p>
              <p className="text-xs text-purple-400 truncate">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0B0A10] to-[#0B0A10]">
        
        {/* Top Header */}
        <header className="h-20 border-b border-purple-900/30 flex items-center justify-between px-4 lg:px-8 bg-[#0B0A10]/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-white hidden sm:block">
              {activeTab}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transform hover:-translate-y-0.5">
              <Plus className="w-4 h-4" /> New Post
            </button>
            <div className="w-9 h-9 rounded-full bg-[#1A1825] border border-purple-500/30 flex items-center justify-center text-purple-400 cursor-pointer hover:bg-purple-500/10 transition-colors">
              <Clock className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Scrollable Content View */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar relative">
          
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            {activeTab === 'Home' && <DashboardHome />}
            {activeTab === 'AI Post Generator' && <AIPostGenerator />}
            {activeTab === 'Content Calendar' && <ContentCalendar />}
            {activeTab === 'Productivity Tools' && <ProductivityTools />}
            
            {/* Fallback for unbuilt tabs */}
            {['My Plans', 'Social Accounts', 'Automation Templates', 'Analytics', 'Settings'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center h-96 border border-dashed border-purple-900/50 rounded-2xl bg-[#110F1A]/50 backdrop-blur-sm">
                <Sparkles className="w-12 h-12 text-purple-500/50 mb-4" />
                <h2 className="text-xl font-medium text-white mb-2">{activeTab}</h2>
                <p className="text-slate-400 text-center max-w-md">
                  This module is part of the full repository setup. Connects to Cloudflare Workers API.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(168, 85, 247, 0.4); }
      `}} />
    </div>
  );
}

// --- SUB-COMPONENTS ---

function NavItem({ item, isActive, onClick }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative
        ${isActive 
          ? 'bg-gradient-to-r from-purple-600/20 to-fuchsia-600/10 text-white border border-purple-500/30' 
          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}
      `}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-purple-500 to-fuchsia-500 rounded-r-full" />
      )}
      <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-purple-400' : 'group-hover:text-purple-400'}`} />
      <span className="font-medium text-sm">{item.name}</span>
    </button>
  );
}

// 1. Dashboard Home View
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
          <div key={i} className="bg-[#110F1A] border border-purple-900/30 rounded-2xl p-6 hover:border-purple-500/30 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-slate-300">
                {stat.trend}
              </span>
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
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-900 to-slate-800 flex items-center justify-center shrink-0">
                  {item === 1 ? <Instagram className="w-6 h-6 text-pink-500" /> : <Twitter className="w-6 h-6 text-blue-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white truncate">Product Launch Teaser</h4>
                  <p className="text-sm text-slate-400 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Today at 2:00 PM
                  </p>
                </div>
                <div className="hidden sm:flex px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                  Ready
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#110F1A] border border-purple-900/30 rounded-2xl p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3 flex-1">
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20 transition-all">
              <Wand2 className="w-6 h-6" />
              <span className="text-sm font-medium">AI Post</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-all">
              <Calendar className="w-6 h-6" />
              <span className="text-sm font-medium">Schedule</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 transition-all">
              <CheckSquare className="w-6 h-6" />
              <span className="text-sm font-medium">Habits</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all">
              <BarChart2 className="w-6 h-6" />
              <span className="text-sm font-medium">Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. AI Post Generator View (Core Feature requested)
function AIPostGenerator() {
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setResult(null);

    // Simulate Cloudflare Workers AI call (Stable Diffusion + Llama 3)
    setTimeout(() => {
      setResult({
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
        caption: `🚀 Transform your workflow with the power of AI!\n\nStop wasting hours on manual content creation. Let OmniToolz handle the heavy lifting while you focus on scaling your business. Our new automated dashboard is live! 📈💼\n\nDrop a 💜 in the comments if you are ready to 10x your productivity!\n\n#AI #Productivity #SaaS #GrowthHack #SocialMediaMarketing #OmniToolz`,
      });
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-140px)]">
      {/* Input Section */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="bg-[#110F1A] border border-purple-900/30 rounded-2xl p-6 flex flex-col gap-4 shadow-lg">
          <div>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Create AI Post
            </h2>
            <p className="text-sm text-slate-400 mt-1">Powered by Workers AI (SDXL + LLM-3)</p>
          </div>

          <div className="space-y-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Platform</label>
              <div className="grid grid-cols-3 gap-2">
                {['instagram', 'twitter', 'linkedin'].map((plat) => (
                  <button
                    key={plat}
                    onClick={() => setPlatform(plat)}
                    className={`p-2 rounded-xl flex justify-center items-center border transition-all ${
                      platform === plat 
                        ? 'bg-purple-500/20 border-purple-500/50 text-white' 
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    {plat === 'instagram' && <Instagram className="w-5 h-5" />}
                    {plat === 'twitter' && <Twitter className="w-5 h-5" />}
                    {plat === 'linkedin' && <Linkedin className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">What is the post about?</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A futuristic office setup with neon purple lights, announcing our new AI productivity tools..."
                className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!prompt || isGenerating}
              className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                !prompt || isGenerating 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Magic
                </>
              )}
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-br from-purple-900/20 to-[#110F1A] border border-purple-500/20 rounded-2xl p-5">
          <h4 className="font-medium text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" /> API Architecture
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            This module hits the Cloudflare Worker endpoint <code className="text-purple-300 bg-purple-900/30 px-1 rounded">/api/generatePost</code> which runs <strong>Stable Diffusion XL</strong> for images and <strong>Llama-3</strong> for captions in parallel.
          </p>
        </div>
      </div>

      {/* Output Section */}
      <div className="lg:col-span-8 h-full min-h-[500px]">
        <div className="bg-[#110F1A] border border-purple-900/30 rounded-2xl p-6 h-full flex flex-col relative overflow-hidden">
          {/* Background glow when active */}
          {result && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/5 blur-[120px] pointer-events-none rounded-full" />}
          
          <div className="flex justify-between items-center 
