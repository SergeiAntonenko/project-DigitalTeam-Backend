import { model, Schema } from 'mongoode';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
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

export const UserCollction = model('user', userSchema);
