import { Router } from 'express';
import { TeamModel } from '../models/index.js';
const teamsRouter = Router();
teamsRouter.get('/', async (_request, response, next) => {
    try {
        const teams = await TeamModel.find().sort({ createdAt: -1 });
        response.json({
            ok: true,
            items: teams,
        });
    }
    catch (error) {
        next(error);
    }
});
teamsRouter.post('/', async (request, response, next) => {
    try {
        const team = await TeamModel.create(request.body);
        response.status(201).json({
            ok: true,
            item: team,
        });
    }
    catch (error) {
        next(error);
    }
});
export default teamsRouter;
