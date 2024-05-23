/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import HttpStatus from 'http-status-codes';
import Orderservice from '../services/order.service';
import { Request, Response, NextFunction } from 'express';
import IdGenerator from '../utils/userId.util';
// import { IOrder } from '../interfaces/order.interface';

class OrderController {
  private Orderservice = new Orderservice();
  private idGenerate = new IdGenerator();
  /**
   * Controller to get all Orders available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getAllOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    try {
      const data = await this.Orderservice.getAllOrders();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All Orders fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getOrderById = async (
    req: Request,
    res: Response,
    next: NextFunction
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    try {
      const data = await this.Orderservice.getOrder(req.params.id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'User fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public newOrder = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      console.log(req.body);
      const orderCreated = await this.Orderservice.getOrder(req.body._id);
      if (orderCreated) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Order has already been created',
          data: '',
          status: HttpStatus.BAD_REQUEST
        });
      } else {
        const order = await this.Orderservice.createOrder({ ...req.body });
        if (order) {
          return res.status(HttpStatus.CREATED).json({
            message: 'Order created',
            data: order,
            status: HttpStatus.CREATED
          });
        }
      }
    } catch (error) {
      next(error);
    }
  };

   /**
   * Controller to get a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
   public getAllOrdersByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    try {
      const data = await this.Orderservice.getOrdersByUser(req.params.userId);
      return res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'User fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

}

export default OrderController;
