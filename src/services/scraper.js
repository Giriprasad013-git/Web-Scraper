import { parseHTML } from '../utils/htmlParser.js';

export async function scrapeUrl(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    return parseHTML(html);
  } catch (error) {
    throw new Error(`Failed to scrape URL: ${error.message}`);
  }
}