import { Env } from '../index';

export async function handleGeneratePost(request: Request, env: Env): Promise<Response> {
  const { prompt, platform } = await request.json();

  if (!prompt) {
    return new Response(JSON.stringify({ error: "Prompt is required" }), { status: 400 });
  }

  try {
    // 1. Generate Caption & Hashtags using Llama 3
    // We pass context based on the target platform (e.g., Instagram vs LinkedIn)
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

    // 2. Generate Image using Stable Diffusion XL
    const imageResponse = await env.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', {
      prompt: `A high quality, professional, photorealistic social media image representing: ${prompt}`,
    });

    // 3. Store the generated Image in Cloudflare R2
    const imageId = crypto.randomUUID();
    const imageKey = `generated/${imageId}.png`;
    
    // imageResponse is a byte array/stream from the AI model
    await env.IMAGE_BUCKET.put(imageKey, imageResponse, {
      httpMetadata: { contentType: 'image/png' }
    });

    // Construct the public URL (replace with your actual R2 public bucket domain)
    const imageUrl = `https://r2-public.yourdomain.com/${imageKey}`;

    // Return the combined payload to the Next.js frontend
    return new Response(JSON.stringify({
      success: true,
      caption: captionResponse.response,
      imageUrl: imageUrl
    }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

  } catch (error: any) {
    console.error("AI Generation Failed:", error);
    return new Response(JSON.stringify({ error: "AI processing failed." }), { status: 500 });
  }
}
