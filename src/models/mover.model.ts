/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';
import { IMover } from '../interfaces/mover.interface';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'business', 'user', 'mover']
    },
    password: {
      type: String,
    },
    phone: {
      type: Number
    },
    isVerified: {
      type: Boolean
    },
    isGoogleUser: {
      type: Boolean
    },
    _id: {
      type: String,
      required: true
    },
    currentAddress: {
        type: String
    },
    bankVerificationNumber: {
        type: String
    },
  },
  {
    timestamps: true
  }
);

export default model<IMover>('Mover', userSchema);
