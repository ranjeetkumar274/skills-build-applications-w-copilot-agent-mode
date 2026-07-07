import { Router } from 'express';

import { ActivityModel } from '../models/index.js';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response, next) => {
  try {
    const activities = await ActivityModel.find().sort({ occurredAt: -1 });

    response.json({
      ok: true,
      items: activities,
    });
  } catch (error) {
    next(error);
  }
});

activitiesRouter.post('/', async (request, response, next) => {
  try {
    const activity = await ActivityModel.create(request.body);

    response.status(201).json({
      ok: true,
      item: activity,
    });
  } catch (error) {
    next(error);
  }
});

export default activitiesRouter;