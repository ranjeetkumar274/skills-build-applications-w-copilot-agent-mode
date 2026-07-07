import { Schema, model } from 'mongoose';
const leaderboardSchema = new Schema({
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, default: 0, min: 0 },
    rank: { type: Number, default: 0, min: 0 },
    updatedAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});
export const LeaderboardModel = model('Leaderboard', leaderboardSchema);
