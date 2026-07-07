import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, default: 0, min: 0 },
    caloriesBurned: { type: Number, default: 0, min: 0 },
    occurredAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});
export const ActivityModel = model('Activity', activitySchema);
