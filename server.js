import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { setupRoutes } from './src/routes/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Setup routes
setupRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});