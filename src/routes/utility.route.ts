/* eslint-disable prettier/prettier */
import express, { IRouter } from 'express';
// import { userAuth } from '../middlewares/auth.middleware';
import OrderController from '../controllers/order.controller';
// import { Position } from 'geojson';
import AppUtils from '../utils/app.util';
class UtilRoute {
    private router = express.Router();
    private orderController = new OrderController();
    private appUtils = new AppUtils();
    constructor() {
        this.routes();
    }
    private routes = () => {
        //router to get all orders by a user
        // this.router.get('/user/:userId',
        // userAuth, this.orderController.getAllOrdersByUserId);
        //router to create an order by a user
        this.router.post('/calcprice', async (req,res)=>{
            const {location1, location2} = req.body;
            console.log(location1, location2);
            const price = await this.appUtils.calcPrice(location1, location2);
            console.log(price);
            res.status(200).json({
                code: 200,
                data: price,
                message: 'Price calculated successfully'
            });
        });
        this.router.post('/pointiswithinarea', async (req,res)=>{
            const {location1} = req.body;
            console.log(location1);
            const isWithinArea =
            await this.appUtils.pointIsWithinArea(location1);
            console.log(isWithinArea);
            res.status(200).json({
                code: 200,
                data: isWithinArea,
                message: 'Point location found'
            });
        }); //to be implemented
        //router to update an order by a user
        // this.router.patch('/:orderId', this.orderController.patchOrder);
        //router to delete an order by a user
        // this.router.delete('/:orderId', userAuth);
        //router to get an order
        // this.router.get('/:orderId', this.orderController.getOrderById);
    }
    public getRoutes = (): IRouter => {
        return this.router;
    }
}
export default UtilRoute;