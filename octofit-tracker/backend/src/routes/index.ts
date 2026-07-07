import { Router } from 'express';

import { baseUrl } from '../config/base-url.js';
import healthRouter from './health.js';
import statusRouter from './status.js';

const apiRouter = Router();

apiRouter.get('/', (_request, response) => {
  response.json({
    ok: true,
    message: 'Octofit Tracker API',
    baseUrl,
  });
});

apiRouter.use('/health', healthRouter);
apiRouter.use('/status', statusRouter);

export default apiRouter;