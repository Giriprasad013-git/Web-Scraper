export function encodeCredentials(username, password) {
  const credentials = `${username}:${password}`;
  return Buffer.from(credentials).toString('base64');
}