import { model, Schema } from 'mongoose';

import { localDate } from '../../services/waterServices.js';
import { localTime } from '../../services/waterServices.js';

const waterSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    localMonth: { type: String },
    localDate: { type: String, default: () => localDate() },
    localTime: { type: String, default: () => localTime() },
    waterValue: { type: Number, required: [true, 'waterValue is required'] },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Water = model('Water', waterSchema);
