function AIPostGenerator() {
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  // 🚨 YAHAN APNA SAHI WORKER URL DAALEIN (Niche padhein)
  const WORKER_URL = "https://omnitoolaz-ai-automation.pages.dev"; // <-- Isko check karein

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

      if (!response.ok) throw new Error("Worker URL is incorrect or offline.");

      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        alert("AI Error: " + data.error);
      }
    } catch (err) {
      alert("Connection Error: Please check if your WORKER_URL is correct in Dashboard.jsx.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* LEFT SIDE: Input Form */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#110F1A] rounded-2xl p-6 border border-purple-900/30">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Creative Concept</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A cute dog in space..."
            className="w-full h-32 bg-[#0B0A10] border border-purple-900/30 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-purple-500 transition-colors resize-none"
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Ignite AI Engines ⚡'}
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: Image & Text Result */}
      <div className="lg:col-span-7">
        <div className="bg-[#110F1A] rounded-2xl p-6 border border-purple-900/30 min-h-[400px] flex flex-col items-center justify-center">
          
          {isGenerating && <div className="text-purple-400 animate-pulse font-semibold">Summoning AI... Please wait...</div>}
          
          {!isGenerating && !result && (
            <div className="text-slate-500 text-center">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your generated masterpiece will appear here.</p>
            </div>
          )}

          {/* YAHAN WOH CODE HAI JO IMAGE AUR TEXT SHOW KAREGA */}
          {!isGenerating && result && (
            <div className="w-full space-y-6 animate-fade-in">
              {/* Show Base64 Image */}
              {result.imageUrl && (
                <img 
                  src={result.imageUrl} 
                  alt="AI Generated" 
                  className="w-full rounded-xl border border-purple-900/50 shadow-2xl object-cover"
                />
              )}
              
              {/* Show Generated Text (Caption) */}
              {(result.copy || result.caption) && (
                <div className="bg-[#0B0A10] p-5 rounded-xl border border-purple-900/30">
                  <p className="text-sm font-bold text-purple-400 mb-2">GENERATED COPY</p>
                  <p className="text-slate-300 whitespace-pre-wrap">{result.copy || result.caption}</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
