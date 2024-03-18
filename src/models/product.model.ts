/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces/product.interface';

const userSchema = new Schema(
  {
    name: {
      type: String
    },
    price: {
        type: String
    },
    category: {
        type: String
    },
    qty: {
        type: Number
    }
  },
  {
    timestamps: true
  }
);

export default model<IProduct>('Product', userSchema);
