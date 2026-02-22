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
