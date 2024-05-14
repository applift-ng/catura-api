/* eslint-disable prettier/prettier */
import express, { IRouter } from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import OrderController from '../controllers/order.controller';

class OrderRoute {
    private router = express.Router();
    private orderController = new OrderController();
    constructor() {
        this.routes();
    }
    private routes = () => {
        //router to get all orders by a user
        // this.router.get('/:userId', userAuth, this.orderController.);
        //router to create an order by a user
        this.router.post('', userAuth, this.orderController.newOrder);
        //router to update an order by a user
        this.router.patch('/:orderId', userAuth);
        //router to delete an order by a user
        this.router.delete('/:orderId', userAuth);
        //router to get an order
        this.router.get('/:orderId', this.orderController.getOrderById);
    }
    public getRoutes = (): IRouter => {
        return this.router;
    }
}
export default OrderRoute;