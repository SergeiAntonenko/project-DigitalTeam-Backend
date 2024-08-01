import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Man', 'Woman', 'other'],
      required: true,
      default: 'Woman',
    },
    weight: {
      type: Number,
      required: false,
    },
    activeTime: {
      type: Number,
      required: false,
    },
    dailyWaterGoal: {
      type: Number,
      required: false,
      default: 1.5,
    },
    userId: {
      type: Schema.ObjectId,
      required: false,
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

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
