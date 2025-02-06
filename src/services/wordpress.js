import { encodeCredentials } from '../utils/auth.js';

export async function createWordPressPost({ wp_url, username, password, title, content, status }) {
  const endpoint = `${wp_url}/wp-json/wp/v2/posts`;
  const authHeader = encodeCredentials(username, password);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authHeader}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        content,
        status
      })
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Failed to create WordPress post: ${error.message}`);
  }
}