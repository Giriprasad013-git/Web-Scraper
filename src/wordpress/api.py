import requests
import json
import base64

class WordPressAPI:
    def __init__(self, wp_url, username, password):
        self.wp_url = wp_url
        self.auth = {
            'username': username,
            'password': password
        }
    
    def create_post(self, title, content, status='draft', categories=None, tags=None):
        endpoint = f"{self.wp_url}/wp-json/wp/v2/posts"
        data = {
            'title': title,
            'content': content,
            'status': status
        }
        
        if categories:
            data['categories'] = categories.split(',')
        if tags:
            data['tags'] = tags.split(',')
        
        auth_string = f"{self.auth['username']}:{self.auth['password']}"
        auth_bytes = auth_string.encode('ascii')
        base64_bytes = base64.b64encode(auth_bytes)
        auth_header = base64_bytes.decode('ascii')
        
        headers = {
            'Authorization': f'Basic {auth_header}',
            'Content-Type': 'application/json'
        }
        
        try:
            response = requests.post(endpoint, json=data, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            return {'error': str(e)}