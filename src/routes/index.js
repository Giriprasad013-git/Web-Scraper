import { Router } from 'express';
import { scrapeHandler } from './handlers/scrapeHandler.js';
import { wordpressHandler } from './handlers/wordpressHandler.js';

export function setupRoutes(app) {
  const router = Router();

  // Scraping routes
  router.post('/scrape', scrapeHandler);
  
  // WordPress routes
  router.post('/post-to-wordpress', wordpressHandler);

  app.use('/api', router);
}