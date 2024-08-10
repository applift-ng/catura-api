/* eslint-disable prettier/prettier */
import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import moverController from '../controllers/mover.controller';
import userValidator from '../validators/user.validator';
import MoverValidator from '../validators/mover.validator';
import { userAuth } from '../middlewares/auth.middleware';

class UserRoutes {
  private UserController = new userController();
  private MoverController = new moverController();
  private router = express.Router();
  private UserValidator = new userValidator();
  private MoverValidator = new MoverValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    //route to get all users
    this.router.get('/user', this.UserController.getAllUsers);

    //route to create a new user
    this.router.post('/user/signup',
      this.UserValidator.newUser, this.UserController.newUser);

    //router to create a new user using google
    this.router.get('/google/callback', this.UserController.googleCallback);

    //router to login an existing user
    this.router.post('/user/login', this.UserController.loginUser);

    //route to get a single user
    this.router.get('/user/:id', userAuth, this.UserController.getUser);
    //route to update a single user
    // this.router.put('/:_id', this.UserController.updateUser);

    //route to delete a single user
    this.router.delete('/user/:_id', this.UserController.deleteUser);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
