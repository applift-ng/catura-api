import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    accountName: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: Number
    },
    businessName: {
      type: String
    },
    businessLogo: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model<IUser>('User', userSchema);
