import { Router } from 'express';

import { WorkoutModel } from '../models/index.js';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_request, response, next) => {
  try {
    const workouts = await WorkoutModel.find().sort({ completedAt: -1 });

    response.json({
      ok: true,
      items: workouts,
    });
  } catch (error) {
    next(error);
  }
});

workoutsRouter.post('/', async (request, response, next) => {
  try {
    const workout = await WorkoutModel.create(request.body);

    response.status(201).json({
      ok: true,
      item: workout,
    });
  } catch (error) {
    next(error);
  }
});

export default workoutsRouter;