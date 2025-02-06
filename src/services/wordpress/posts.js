import fetch from 'node-fetch';

export class PostsService {
  constructor(client) {
    this.client = client;
  }

  async createPost({ title, content, status = 'draft', categories = [], tags = [] }) {
    const endpoint = this.client.getEndpoint('/wp-json/wp/v2/posts');
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': this.client.getAuthHeader(),
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          content: content,
          status: status || 'draft',
          categories: categories ? categories.split(',').map(c => parseInt(c.trim())).filter(Boolean) : [],
          tags: tags ? tags.split(',').map(t => parseInt(t.trim())).filter(Boolean) : []
        })
      });

      const data = await response.text();
      let jsonData;
      
      try {
        jsonData = JSON.parse(data);
      } catch (e) {
        throw new Error(`Invalid response: ${data}`);
      }

      if (!response.ok) {
        throw new Error(jsonData.message || `HTTP error! status: ${response.status}`);
      }

      return jsonData;
    } catch (error) {
      console.error('WordPress API Error:', error);
      throw new Error(`WordPress API error: ${error.message}`);
    }
  }
}