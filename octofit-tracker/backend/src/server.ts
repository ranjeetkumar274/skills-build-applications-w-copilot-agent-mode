import { createApp } from './app.js';
import { connectToDatabase } from './config/database.js';

const port = Number(process.env.PORT ?? 8000);

// Your GitHub Codespace name
const codespaceName =
  process.env.CODESPACE_NAME ?? 'automatic-memory-pjrxp69gjqgw37pq6';

const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

async function startServer() {
  try {
    // Connect to database
    await connectToDatabase();

    // Create Express app
    const app = createApp();

    // Start server
    app.listen(port, () => {
      console.log(`🚀 Octofit backend listening at ${apiBaseUrl}`);
      console.log(`📡 Port: ${port}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV ?? 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start Octofit backend:', error);
    process.exit(1);
  }
}

startServer();
