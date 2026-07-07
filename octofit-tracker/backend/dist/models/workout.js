import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    durationMinutes: { type: Number, default: 0, min: 0 },
    caloriesBurned: { type: Number, default: 0, min: 0 },
    completedAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});
export const WorkoutModel = model('Workout', workoutSchema);
