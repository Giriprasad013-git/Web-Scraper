const express = require('express');
const { PythonShell } = require('python-shell');
const router = express.Router();

module.exports = (pythonPath) => {
  router.post('/scrape', (req, res) => {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    let options = {
      mode: 'json',
      pythonPath,
      args: ['--url', url]
    };

    PythonShell.run('src/scraper/scraper.py', options)
      .then(results => {
        res.json(results[0]);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post('/post-to-wordpress', (req, res) => {
    const { wp_url, username, password, title, content, status } = req.body;
    
    if (!wp_url || !username || !password || !title || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let options = {
      mode: 'json',
      pythonPath,
      args: [
        '--wp_url', wp_url,
        '--username', username,
        '--password', password,
        '--title', title,
        '--content', content,
        '--status', status || 'draft'
      ]
    };

    PythonShell.run('src/wordpress/post.py', options)
      .then(results => {
        res.json(results[0]);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};