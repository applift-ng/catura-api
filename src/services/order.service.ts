/* eslint-disable prettier/prettier */
import Order from '../models/order.model';
import { IOrder } from '../interfaces/order.interface';

class OrderService {
    // get all order by user
    public getOrdersByUser = async (id: string): Promise<IOrder[]> => {
        const data = await Order.find({'sender.id': id});
        return data;
    }
    // create new order
    // eslint-disable-next-line max-len
    public createOrder = async (id: string, data: IOrder): Promise<IOrder> => {
        const orderData = await Order.create({
            _id: id, ...data
        });
        return orderData;
    };
    public getOrders = async (): Promise<IOrder[]> => {
        const data = await Order.find();
        return data;
    }
}
export default OrderService;