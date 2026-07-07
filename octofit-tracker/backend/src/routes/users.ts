import { Router } from 'express';

import { UserModel } from '../models/index.js';

const usersRouter = Router();

usersRouter.get('/', async (_request, response, next) => {
  try {
    const users = await UserModel.find().sort({ createdAt: -1 });

    response.json({
      ok: true,
      items: users,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/', async (request, response, next) => {
  try {
    const user = await UserModel.create(request.body);

    response.status(201).json({
      ok: true,
      item: user,
    });
  } catch (error) {
    next(error);
  }
});

export default usersRouter;