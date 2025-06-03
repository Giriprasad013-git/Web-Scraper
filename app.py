import base64
import json
import urllib.request
import urllib.parse
from http.server import HTTPServer, BaseHTTPRequestHandler
from html.parser import HTMLParser
from urllib.error import URLError
import re
from datetime import datetime

class CustomHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.data = []
        self.current_tag = None
        
    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        
    def handle_data(self, data):
        if data.strip():
            self.data.append({
                'tag': self.current_tag,
                'content': data.strip()
            })

class WebScraper:
    def __init__(self):
        self.parser = CustomHTMLParser()
    
    def scrape(self, url):
        try:
            with urllib.request.urlopen(url) as response:
                html = response.read().decode('utf-8')
                self.parser.feed(html)
                return self.parser.data
        except URLError as e:
            return {'error': str(e)}

class WordPressAPI:
    def __init__(self, wp_url, username, password):
        self.wp_url = wp_url
        self.auth = {
            'username': username,
            'password': password
        }
    
    def create_post(self, title, content):
        endpoint = f"{self.wp_url}/wp-json/wp/v2/posts"
        data = {
            'title': title,
            'content': content,
            'status': 'publish'
        }
        
        auth_string = f"{self.auth['username']}:{self.auth['password']}"
        auth_bytes = auth_string.encode('ascii')
        base64_bytes = base64.b64encode(auth_bytes)
        auth_header = base64_bytes.decode('ascii')
        
        headers = {
            'Authorization': f'Basic {auth_header}',
            'Content-Type': 'application/json'
        }
        
        try:
            data = json.dumps(data).encode('utf-8')
            req = urllib.request.Request(endpoint, data=data, headers=headers, method='POST')
            with urllib.request.urlopen(req) as response:
                return json.loads(response.read().decode('utf-8'))
        except URLError as e:
            return {'error': str(e)}