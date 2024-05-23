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
    public createOrder = async (data: IOrder): Promise<IOrder> => {
        const orderData = await Order.create({
            ...data
        });
        return orderData;
    };
    public getAllOrders = async (): Promise<IOrder[]> => {
        const data = await Order.find();
        return data;
    }
    public getOrder = async (id: string): Promise<IOrder> => {
        const data = await Order.findById(id);
        return data;
    }
}
export default OrderService;