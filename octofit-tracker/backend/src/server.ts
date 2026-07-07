import { createApp } from './app.js';
import { baseUrl } from './config/base-url.js';
import { connectToDatabase } from './config/database.js';

const port = Number(process.env.PORT ?? 8000);

async function startServer() {
  await connectToDatabase();

  const app = createApp();

  app.listen(port, () => {
    console.log(`Octofit backend listening at ${baseUrl}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start Octofit backend:', error);
  process.exit(1);
});