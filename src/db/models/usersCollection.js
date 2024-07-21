import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    gender: {
      type: String,
      enum: ['men', 'women', 'other'],
      required: true,
      default: 'men',
    },
    weight: {
      type: Number,
      required: true,
    },
    dailyWaterGoal: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.ObjectId,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UsersCollection = model('user', usersSchema);
