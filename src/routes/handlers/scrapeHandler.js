import { scrapeUrl } from '../../services/scraper.js';

export async function scrapeHandler(req, res) {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const data = await scrapeUrl(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}