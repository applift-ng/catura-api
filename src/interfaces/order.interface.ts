/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface IOrder extends Document {
  _id: string;
  sender: {
    email: string,
    location: string,
    id: string
  };
  receiver: {
    email: string,
    phoneNumber: string,
    location: string
 };
}