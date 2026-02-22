import { Env } from '../index';

export async function handleAutoPost(env: Env): Promise<void> {
  // Get current time in ISO format for comparison with scheduled times
  const now = new Date().toISOString();

  // Find posts scheduled for now (or earlier missed posts) that are still 'pending'
  const { results: pendingPosts } = await env.DB.prepare(
    `SELECT * FROM scheduled_posts 
     WHERE status = 'pending' AND scheduled_time <= ?`
  ).bind(now).all();

  // If no posts are due, exit gracefully
  if (!pendingPosts || pendingPosts.length === 0) return;

  for (const post of pendingPosts) {
    try {
      // 1. Fetch user's social access tokens securely from DB
      const account = await env.DB.prepare(
        `SELECT access_token FROM social_accounts WHERE user_id = ? AND platform = ?`
      ).bind(post.user_id, post.platform).first();

      if (!account) {
        throw new Error(`No connected account found for ${post.platform}`);
      }

      console.log(`[Cron] Preparing to post to ${post.platform} for user ${post.user_id}...`);
      
      // 2. Publish to specific platforms (Placeholder logic)
      let publishSuccess = false;
      
      if (post.platform === 'instagram') {
        // e.g., POST https://graph.facebook.com/v18.0/{ig-user-id}/media
        // publishSuccess = await publishToInstagram(account.access_token, post.image_url, post.caption);
        publishSuccess = true; 
      } else if (post.platform === 'twitter') {
        // e.g., POST https://api.twitter.com/2/tweets
        publishSuccess = true;
      }

      // 3. Update status in DB upon success
      if (publishSuccess) {
        await env.DB.prepare(
          `UPDATE scheduled_posts SET status = 'published' WHERE id = ?`
        ).bind(post.id).run();
        console.log(`[Cron] Successfully published post ${post.id}`);
      }

    } catch (error) {
      console.error(`[Cron] Failed to post ${post.id}:`, error);
      
      // Mark as failed so we can show it to the user in the dashboard
      await env.DB.prepare(
        `UPDATE scheduled_posts SET status = 'failed' WHERE id = ?`
      ).bind(post.id).run();
    }
  }
}
