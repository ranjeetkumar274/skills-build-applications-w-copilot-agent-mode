import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    score: { type: Number, default: 0, min: 0 },
}, {
    timestamps: true,
});
export const TeamModel = model('Team', teamSchema);
