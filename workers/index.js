export default {
  async fetch(request, env) {
    // 1. CORS Headers - Yeh website ko block hone se rokega
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
    };

    // Preflight request handle karna
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method === "POST") {
      try {
        const body = await request.json();
        const prompt = body.prompt;

        // ... YAHAN AAPKA CLOUDFLARE AI KA CODE HOGA ...
        // const response = await env.AI.run(..., { prompt });
        // const imageBuffer = await response.arrayBuffer();
        // const base64Image = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));
        // const imageUrl = `data:image/jpeg;base64,${base64Image}`;

        // 2. JSON RESPONSE RETURN KAREIN (Direct image nahi)
        return new Response(JSON.stringify({
          success: true,
          image: imageUrl, // <-- Ensure this name matches your App.jsx
          copy: "Here is your AI generated content!" // <-- Ensure this name matches your App.jsx
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });

      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        });
      }
    }
    
    return new Response("Not Found", { status: 404, headers: corsHeaders });
  }
};
