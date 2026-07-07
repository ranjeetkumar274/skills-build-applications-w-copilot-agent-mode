import { Schema, model, type InferSchemaType, type Types } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: { type: String, enum: ['member', 'coach', 'admin'], default: 'member' },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    points: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
  },
);

export type User = InferSchemaType<typeof userSchema> & {
  _id: Types.ObjectId;
};

export const UserModel = model('User', userSchema);