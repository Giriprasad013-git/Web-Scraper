from flask import Blueprint, request, jsonify
from datetime import datetime
from ..scraper.scraper import WebScraper
from ..wordpress.api import WordPressAPI

api = Blueprint('api', __name__)
scraper = WebScraper()

@api.route('/scrape', methods=['POST'])
def scrape_url():
    data = request.get_json()
    url = data.get('url')
    
    if not url:
        return jsonify({'error': 'URL is required'}), 400
        
    result = scraper.scrape(url)
    return jsonify(result)

@api.route('/post-to-wordpress', methods=['POST'])
def post_to_wordpress():
    data = request.get_json()
    wp_url = data.get('wp_url')
    username = data.get('username')
    password = data.get('password')
    title = data.get('title')
    content = data.get('content')
    
    if not all([wp_url, username, password, title, content]):
        return jsonify({'error': 'Missing required fields'}), 400
    
    wp_api = WordPressAPI(wp_url, username, password)
    result = wp_api.create_post(title, content)
    return jsonify(result)

@api.route('/scrape-and-post', methods=['POST'])
def scrape_and_post():
    data = request.get_json()
    scrape_url = data.get('scrape_url')
    wp_credentials = data.get('wordpress')
    
    if not scrape_url or not wp_credentials:
        return jsonify({'error': 'Missing required fields'}), 400
        
    # First scrape the content
    scraped_data = scraper.scrape(scrape_url)
    
    if 'error' in scraped_data:
        return jsonify(scraped_data), 400
        
    # Process scraped data into a post
    content = '\n'.join([f"<{item['tag']}>{item['content']}</{item['tag']}>" 
                        for item in scraped_data])
    
    # Post to WordPress
    wp_api = WordPressAPI(
        wp_credentials['url'],
        wp_credentials['username'],
        wp_credentials['password']
    )
    
    result = wp_api.create_post(
        title=f"Scraped Content - {datetime.now().strftime('%Y-%m-%d')}",
        content=content
    )
    
    return jsonify(result)