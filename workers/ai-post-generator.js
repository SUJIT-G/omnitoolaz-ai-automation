export async function handleGeneratePost(request, env) {
  // CORS Headers zaroori hain taaki website API ko block na kare
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    const { prompt, platform } = await request.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), { 
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    // 1. Generate Caption & Hashtags using Llama 3
    const captionResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { 
          role: "system", 
          content: `You are an expert social media manager for ${platform || 'general social media'}. Write a highly engaging caption, include relevant emojis, and append 5-7 targeted hashtags at the end.` 
        },
        { 
          role: "user", 
          content: `Create a post about this topic: ${prompt}` 
        }
      ]
    });

    const generatedText = captionResponse.response;

    // 2. Generate Image using Stable Diffusion XL
    const imageResponse = await env.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', {
      prompt: `A high quality, professional, photorealistic social media image representing: ${prompt}`,
    });

    // 3. DIRECT IMAGE FIX (Bypass R2 yourdomain.com error)
    // Hum raw image ko Base64 format mein convert kar rahe hain
    const imageBuffer = await new Response(imageResponse).arrayBuffer();
    const bytes = new Uint8Array(imageBuffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    const base64Image = btoa(binary);
    
    // Website ko directly Base64 data de rahe hain
    const imageUrl = `data:image/png;base64,${base64Image}`;

    // Return Data to Frontend
    return new Response(JSON.stringify({
      success: true,
      imageUrl: imageUrl,     // Image ke liye
      caption: generatedText, // Agar frontend 'caption' use kar raha hai
      copy: generatedText     // Agar frontend 'copy' use kar raha hai (Taaki undefined na aaye!)
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("AI Generation Failed:", error);
    return new Response(JSON.stringify({ error: "AI processing failed." }), { 
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
}
