import { connectToDatabase } from '../config/database.js';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models/index.js';

async function seedDatabase() {
  try {
    await connectToDatabase();

    await Promise.all([
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      TeamModel.deleteMany({}),
      UserModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const alphaTeam = await TeamModel.create({ name: 'Alpha Team', score: 1250 });
    const betaTeam = await TeamModel.create({ name: 'Beta Team', score: 980 });

    const users = await UserModel.create([
      { name: 'Avery Stone', email: 'avery@example.com', role: 'coach', team: alphaTeam._id, points: 320 },
      { name: 'Jordan Lee', email: 'jordan@example.com', role: 'member', team: alphaTeam._id, points: 210 },
      { name: 'Morgan Patel', email: 'morgan@example.com', role: 'member', team: betaTeam._id, points: 180 },
    ]);

    alphaTeam.members = [users[0]._id, users[1]._id];
    betaTeam.members = [users[2]._id];

    await Promise.all([alphaTeam.save(), betaTeam.save()]);

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
        user: users[2]._id,
        name: 'Full-Body Circuit',
        description: 'Mixed strength and cardio circuit.',
        durationMinutes: 30,
        caloriesBurned: 290,
      },
    ]);

    await LeaderboardModel.create([
      { team: alphaTeam._id, points: alphaTeam.score, rank: 1 },
      { team: betaTeam._id, points: betaTeam.score, rank: 2 },
    ]);

    console.log('Database seeding complete');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
