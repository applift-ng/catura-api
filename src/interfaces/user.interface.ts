import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string | number;
  email: string;
  password: string;
}
