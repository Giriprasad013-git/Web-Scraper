from html.parser import HTMLParser

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