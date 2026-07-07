import { Router } from 'express';

import { baseUrl } from '../config/base-url.js';
import healthRouter from './health.js';
import activitiesRouter from './activities.js';
import leaderboardRouter from './leaderboard.js';
import statusRouter from './status.js';
import teamsRouter from './teams.js';
import usersRouter from './users.js';
import workoutsRouter from './workouts.js';

const apiRouter = Router();

apiRouter.get('/', (_request, response) => {
  response.json({
    ok: true,
    message: 'Octofit Tracker API',
    baseUrl,
  });
});

apiRouter.use('/health', healthRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/teams', teamsRouter);
apiRouter.use('/activities', activitiesRouter);
apiRouter.use('/leaderboard', leaderboardRouter);
apiRouter.use('/workouts', workoutsRouter);
apiRouter.use('/status', statusRouter);

export default apiRouter;