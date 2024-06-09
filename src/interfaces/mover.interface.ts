/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface IMover extends Document {
  _id?: string;
  email: string;
  password?: string;
  accountName: string;
  userName?: string;
  isGoogleUser: boolean;
  isVerified: boolean;
  currentAddress: string;
  phone: string;
  bankVerificationNumber: string;
}
