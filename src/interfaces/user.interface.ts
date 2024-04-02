/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  role: string;
  accountName: string;
}
