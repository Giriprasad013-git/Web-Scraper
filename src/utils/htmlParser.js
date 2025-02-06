import { JSDOM } from 'jsdom';

export function parseHTML(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const data = [];

  const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
  elements.forEach(element => {
    const content = element.textContent.trim();
    if (content) {
      data.push({
        tag: element.tagName.toLowerCase(),
        content
      });
    }
  });

  return data;
}