export class WordPressClient {
  constructor(wpUrl, username, password) {
    // Remove /wp-json/wp/v2/posts if included in the URL
    this.wpUrl = wpUrl.replace(/\/wp-json\/wp\/v2\/posts\/?$/, '');
    this.username = username;
    this.password = password;
  }

  getAuthHeader() {
    const credentials = `${this.username}:${this.password}`;
    return `Basic ${Buffer.from(credentials).toString('base64')}`;
  }

  getEndpoint(path) {
    const baseUrl = this.wpUrl.endsWith('/') ? this.wpUrl.slice(0, -1) : this.wpUrl;
    return `${baseUrl}${path}`;
  }
}