import { Router } from 'express';
import { ActivityModel, LeaderboardModel, TeamModel, UserModel, WorkoutModel, } from '../models/index.js';
const statusRouter = Router();
statusRouter.get('/', async (_request, response, next) => {
    try {
        const [users, teams, activities, leaderboardEntries, workouts] = await Promise.all([
            UserModel.countDocuments(),
            TeamModel.countDocuments(),
            ActivityModel.countDocuments(),
            LeaderboardModel.countDocuments(),
            WorkoutModel.countDocuments(),
        ]);
        response.json({
            ok: true,
            database: 'octofit_db',
            collections: {
                users,
                teams,
                activities,
                leaderboardEntries,
                workouts,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
export default statusRouter;
