/* eslint-disable prettier/prettier */
// import { string } from '@hapi/joi';
import { Schema, model } from 'mongoose';
import { IOrder } from '../interfaces/order.interface';

const orderSchema = new Schema({
    sender: {
        email: String,
        location: Object,
        id: String
    },
    receiver: {
       email: {
        type: String,
       },
       phoneNumber: {
        type: String
       },
       location: {
        type: Object,
       }
    },
    price: {
        type: Number
    },
    pkgDescription: {
        type: String
    },
    status: {
        required: true,
        type: String,
        enum: ['complete', 'inprogress', 'initiated', 'filled']
    },
    _id: {
        type: String,
        required: true
    }
}, {timestamps: true});

export default model<IOrder>('Order', orderSchema);
