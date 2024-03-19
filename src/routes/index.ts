import express, { IRouter } from 'express';
const router = express.Router();

import userRoute from './user.route';
import GoogleAuthRoutes from './googleauth.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/google', new GoogleAuthRoutes().getRoutes());
  router.use('/auth', new userRoute().getRoutes());
  return router;
};

export default routes;
