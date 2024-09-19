/* eslint-disable prettier/prettier */
import express, { IRouter } from 'express';
const router = express.Router();

import userRoute from './user.route';
import OrderRoutes from './order.route';
import MoverRoutes from './movers.route';
import UtilRoute from './utility.route';
// import GoogleAuthRoutes from './googleauth.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  // router.use('/google', new GoogleAuthRoutes().getRoutes());
  router.use('/auth', new userRoute().getRoutes());
  router.use('/auth', new MoverRoutes().getRoutes());
  router.use('/order', new OrderRoutes().getRoutes());
  router.use('/util', new UtilRoute().getRoutes());
  return router;
};

export default routes;
