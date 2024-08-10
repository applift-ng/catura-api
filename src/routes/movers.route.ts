/* eslint-disable prettier/prettier */
import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import moverController from '../controllers/mover.controller';
import userValidator from '../validators/user.validator';
import MoverValidator from '../validators/mover.validator';
import { userAuth } from '../middlewares/auth.middleware';
// import upload from '../middlewares/multer.middleware';

class MoverRoutes {
  private UserController = new userController();
  private MoverController = new moverController();
  private router = express.Router();
  private UserValidator = new userValidator();
  private MoverValidator = new MoverValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    //route to get all movers
    this.router.get('/mover', this.MoverController.getAllMovers);

    //router to create a new mover
    this.router.post('/signup/mover',
      this.MoverValidator.newMover, this.MoverController.newUser);

    //router to create a new mover using google
    this.router.get('/google/mover/callback',
      this.MoverController.googleCallback);

    //router to login an existing mover
    this.router.post('/login/mover', this.MoverController.loginMover);

    //upload personal info for mover
    this.router.put('/mover/verify',
        this.MoverController.getMoverDetails);

    //route to get a single mover
    this.router.get('/mover/:id', userAuth, this.MoverController.getUser);
    //route to delete a mover
    this.router.delete('/mover/:_id', this.MoverController.deleteMover);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default MoverRoutes;
