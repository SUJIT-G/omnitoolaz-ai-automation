export interface Env {
  AI: any; // Cloudflare Workers AI Binding
  DB: D1Database; // Cloudflare D1 Database Binding
  IMAGE_BUCKET: R2Bucket; // Cloudflare R2 Storage Binding
}

import { handleGeneratePost } from './api/generatePost';
import { handleSchedulePost } from './api/schedulePost';
import { handleAutoPost } from './cron/autoPost';

export default {
  // 1. HTTP Fetch Handler for API Requests
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle CORS Preflight requests for the Next.js frontend
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    }

    try {
      // API Route: Generate AI Content (Image + Caption)
      if (request.method === 'POST' && url.pathname === '/api/generate-post') {
        return await handleGeneratePost(request, env);
      }
      
      // API Route: Schedule a Post
      if (request.method === 'POST' && url.pathname === '/api/schedule-post') {
        return await handleSchedulePost(request, env);
      }

      // 404 Fallback
      return new Response('API Route Not Found', { status: 404 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
  },

  // 2. Cron Trigger Handler for Auto-Posting
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    // Keep the worker alive until the auto-posting logic finishes
    ctx.waitUntil(handleAutoPost(env));
  }
};
