import { Env } from '../index';

export async function handleSchedulePost(request: Request, env: Env): Promise<Response> {
  const { userId, platform, imageUrl, caption, scheduledTime } = await request.json();

  // Validate incoming payload
  if (!userId || !platform || !scheduledTime) {
    return new Response(JSON.stringify({ error: "Missing required fields (userId, platform, scheduledTime)" }), { 
      status: 400,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }

  const postId = crypto.randomUUID();

  // Insert the job into the D1 Database
  const { success } = await env.DB.prepare(
    `INSERT INTO scheduled_posts (id, user_id, platform, image_url, caption, scheduled_time, status) 
     VALUES (?, ?, ?, ?, ?, ?, 'pending')`
  )
  .bind(postId, userId, platform, imageUrl, caption, scheduledTime)
  .run();

  if (!success) {
    return new Response(JSON.stringify({ error: "Database insertion failed" }), { 
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }

  return new Response(JSON.stringify({ 
    success: true, 
    message: "Post scheduled successfully",
    postId: postId 
  }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}
