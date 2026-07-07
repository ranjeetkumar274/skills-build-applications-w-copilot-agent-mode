import { Router } from 'express';

import { getDatabaseConnection } from '../config/database.js';

const healthRouter = Router();

healthRouter.get('/', (_request, response) => {
  const state = getDatabaseConnection().readyState;

  response.json({
    ok: true,
    service: 'octofit-backend',
    database: state === 1 ? 'connected' : 'disconnected',
  });
});

export default healthRouter;