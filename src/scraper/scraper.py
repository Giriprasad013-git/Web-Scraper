import requests
from .html_parser import HTMLParser

class WebScraper:
    def __init__(self):
        self.parser = HTMLParser()
    
    def scrape(self, url):
        try:
            response = requests.get(url)
            response.raise_for_status()
            return self.parser.parse(response.text)
        except requests.RequestException as e:
            return {'error': str(e)}