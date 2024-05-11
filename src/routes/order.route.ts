/* eslint-disable prettier/prettier */
import express, { IRouter } from 'express';
import { userAuth } from '../middlewares/auth.middleware';

class OrderRoute {
    private router = express.Router();
    constructor() {
        this.routes();
    }
    private routes = () => {
        //router to get all orders by a user
        this.router.get('/:userId', userAuth);
        //router to create an order by a user
        this.router.post('/:userId/:orderId', userAuth);
        //router to update an order by a user
        this.router.patch('/:userId/:orderId', userAuth);
        //router to delete an order by a user
        this.router.delete('/:userId/:orderId', userAuth);
        //router to get an order by a user
        this.router.get('/:userId/:orderId', userAuth);
    }
    public getRoutes = (): IRouter => {
        return this.router;
    }
}
export default OrderRoute;