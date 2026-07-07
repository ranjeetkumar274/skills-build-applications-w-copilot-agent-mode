import { Router } from 'express';

import { LeaderboardModel } from '../models/index.js';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response, next) => {
  try {
    const entries = await LeaderboardModel.find().sort({ rank: 1, points: -1 });

    response.json({
      ok: true,
      items: entries,
    });
  } catch (error) {
    next(error);
  }
});

leaderboardRouter.post('/', async (request, response, next) => {
  try {
    const entry = await LeaderboardModel.create(request.body);

    response.status(201).json({
      ok: true,
      item: entry,
    });
  } catch (error) {
    next(error);
  }
});

export default leaderboardRouter;