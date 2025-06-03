# from bs4 import BeautifulSoup

# class HTMLParser:
#     @staticmethod
#     def parse(html_content):
#         soup = BeautifulSoup(html_content, 'html.parser')
#         data = []
        
#         for tag in soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
#             if tag.string and tag.string.strip():
#                 data.append({
#                     'tag': tag.name,
#                     'content': tag.string.strip()
#                 })
        
#         return data
from bs4 import BeautifulSoup

class HTMLParser:
    @staticmethod
    def parse(html_content):
        soup = BeautifulSoup(html_content, 'html.parser')
        data = []

        for tag in soup.find_all(True):  # Match all tags
            text = tag.get_text(strip=True) or ''
            data.append({
                'tag': tag.name,
                'content': text,
                'attrs': dict(tag.attrs)
            })

        return data

