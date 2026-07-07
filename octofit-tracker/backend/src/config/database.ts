import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

let connectionPromise: Promise<typeof mongoose> | null = null;

export async function connectToDatabase() {
  if (!connectionPromise) {
    mongoose.set('strictQuery', true);
    connectionPromise = mongoose.connect(connectionString);
  }

  await connectionPromise;
  return mongoose.connection;
}

export function getDatabaseConnection() {
  return mongoose.connection;
}
