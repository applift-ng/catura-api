/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface IOrder extends Document {
    _id: string;
  email: string;
  password?: string;
  role: string;
  accountName: string;
}