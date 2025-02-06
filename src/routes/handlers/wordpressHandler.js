import { createWordPressPost } from '../../services/wordpress.js';

export async function wordpressHandler(req, res) {
  const { wp_url, username, password, title, content, status } = req.body;
  
  if (!wp_url || !username || !password || !title || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await createWordPressPost({
      wp_url,
      username,
      password,
      title,
      content,
      status: status || 'draft'
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}