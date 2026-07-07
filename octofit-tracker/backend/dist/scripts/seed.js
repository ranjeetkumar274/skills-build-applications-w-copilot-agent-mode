import { connectToDatabase } from '../config/database.js';
import { ActivityModel, LeaderboardModel, TeamModel, UserModel, WorkoutModel, } from '../models/index.js';
// Seed the octofit_db database with test data
async function seedDatabase() {
    try {
        await connectToDatabase();
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            ActivityModel.deleteMany({}),
            LeaderboardModel.deleteMany({}),
            TeamModel.deleteMany({}),
            UserModel.deleteMany({}),
            WorkoutModel.deleteMany({}),
        ]);
        const alphaTeam = await TeamModel.create({ name: 'Alpha Team', score: 1280 });
        const betaTeam = await TeamModel.create({ name: 'Beta Team', score: 1010 });
        const gammaTeam = await TeamModel.create({ name: 'Gamma Team', score: 905 });
        const users = await UserModel.create([
            { name: 'Avery Stone', email: 'avery@example.com', role: 'coach', team: alphaTeam._id, points: 340 },
            { name: 'Jordan Lee', email: 'jordan@example.com', role: 'member', team: alphaTeam._id, points: 220 },
            { name: 'Morgan Patel', email: 'morgan@example.com', role: 'member', team: betaTeam._id, points: 205 },
            { name: 'Samira Khan', email: 'samira@example.com', role: 'member', team: gammaTeam._id, points: 190 },
        ]);
        alphaTeam.members = [users[0]._id, users[1]._id];
        betaTeam.members = [users[2]._id];
        gammaTeam.members = [users[3]._id];
        await Promise.all([alphaTeam.save(), betaTeam.save(), gammaTeam.save()]);
        await ActivityModel.create([
            {
                user: users[0]._id,
                team: alphaTeam._id,
                activityType: 'run',
                durationMinutes: 42,
                caloriesBurned: 420,
            },
            {
                user: users[1]._id,
                team: alphaTeam._id,
                activityType: 'bike',
                durationMinutes: 35,
                caloriesBurned: 310,
            },
            {
                user: users[2]._id,
                team: betaTeam._id,
                activityType: 'row',
                durationMinutes: 28,
                caloriesBurned: 260,
            },
            {
                user: users[3]._id,
                team: gammaTeam._id,
                activityType: 'strength',
                durationMinutes: 50,
                caloriesBurned: 390,
            },
        ]);
        await WorkoutModel.create([
            {
                user: users[0]._id,
                name: 'Interval Sprint Session',
                description: 'High-intensity running intervals.',
                durationMinutes: 45,
                caloriesBurned: 470,
            },
            {
                user: users[1]._id,
                name: 'Endurance Ride',
                description: 'Moderate pace cycling session.',
                durationMinutes: 38,
                caloriesBurned: 330,
            },
            {
                user: users[2]._id,
                name: 'Full-Body Circuit',
                description: 'Mixed strength and cardio circuit.',
                durationMinutes: 30,
                caloriesBurned: 290,
            },
            {
                user: users[3]._id,
                name: 'Strength Builder',
                description: 'Upper-body and core strength work.',
                durationMinutes: 55,
                caloriesBurned: 410,
            },
        ]);
        await LeaderboardModel.create([
            { team: alphaTeam._id, points: alphaTeam.score, rank: 1 },
            { team: betaTeam._id, points: betaTeam.score, rank: 2 },
            { team: gammaTeam._id, points: gammaTeam.score, rank: 3 },
        ]);
        console.log('Database seeding complete');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
