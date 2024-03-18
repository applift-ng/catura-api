/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface IProduct extends Document {
  _id: string | number;
  name: string;
  price: string;
  qty: number;
  category: string;
}
