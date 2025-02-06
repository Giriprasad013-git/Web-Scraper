import { copyToClipboard, showNotification } from './utils.js';

document.getElementById('scrapeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('scrapeUrl').value;
    const resultDiv = document.getElementById('scrapeResult');
    const editorDiv = document.getElementById('contentEditor');
    
    try {
        const response = await fetch('/api/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url })
        });
        
        const data = await response.json();
        
        // Show raw data
        resultDiv.querySelector('pre').textContent = JSON.stringify(data, null, 2);
        resultDiv.classList.remove('hidden');
        
        // Populate editor
        const content = data.map(item => item.content).join('\n\n');
        document.getElementById('wpTitle').value = document.title || 'Scraped Content';
        document.getElementById('wpContent').value = content;
        editorDiv.classList.remove('hidden');
    } catch (error) {
        showNotification(error.message, 'error');
    }
});

document.getElementById('wpForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const wpUrl = document.getElementById('wpUrl').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const title = document.getElementById('wpTitle').value;
    const content = document.getElementById('wpContent').value;
    const status = document.getElementById('wpStatus').value;
    const categories = document.getElementById('wpCategories').value;
    const tags = document.getElementById('wpTags').value;
    const resultDiv = document.getElementById('wpResult');
    
    try {
        const response = await fetch('/api/post-to-wordpress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                wp_url: wpUrl,
                username,
                password,
                title,
                content,
                status,
                categories,
                tags
            })
        });
        
        const data = await response.json();
        resultDiv.querySelector('pre').textContent = JSON.stringify(data, null, 2);
        resultDiv.classList.remove('hidden');
        showNotification('Successfully posted to WordPress!');
    } catch (error) {
        showNotification(error.message, 'error');
    }
});

// Copy button handlers
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const target = e.target.getAttribute('data-target');
        const element = document.getElementById(target);
        const content = element.tagName === 'PRE' ? element.textContent : element.value;
        copyToClipboard(content);
    });
});