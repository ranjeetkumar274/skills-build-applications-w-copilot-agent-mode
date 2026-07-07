import { Schema, model, type InferSchemaType, type Types } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    score: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
  },
);

export type Team = InferSchemaType<typeof teamSchema> & {
  _id: Types.ObjectId;
};

export const TeamModel = model('Team', teamSchema);