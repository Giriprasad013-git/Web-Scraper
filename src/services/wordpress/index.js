import { WordPressClient } from './client.js';
import { PostsService } from './posts.js';

export async function createWordPressPost({ wp_url, username, password, title, content, status, categories, tags }) {
  try {
    const client = new WordPressClient(wp_url, username, password);
    const postsService = new PostsService(client);
    
    return await postsService.createPost({
      title,
      content,
      status,
      categories,
      tags
    });
  } catch (error) {
    throw new Error(`Failed to create WordPress post: ${error.message}`);
  }
}