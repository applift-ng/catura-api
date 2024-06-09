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
    this.router.get('', this.UserController.getAllUsers);

    //route to get all movers
    this.router.get('/mover', this.MoverController.getAllMovers);

    //route to create a new user
    this.router.post(
      '/signup',
      this.UserValidator.newUser,
      this.UserController.newUser
    );
    //router to create a new mover
    this.router.post('/signup/mover',
      this.MoverValidator.newMover,
      this.MoverController.newUser);

    //router to create a new user using google
    this.router.get(
      '/google/callback',
      this.UserController.googleCallback
    );

    //router to create a new mover using google
this.router.get(
      '/google/mover/callback',
      this.MoverController.googleCallback
    );
    //router to login an existing user
    this.router.post('/login', this.UserController.loginUser);

    //router to login an existing mover
    this.router.post('/login/mover', this.MoverController.loginUser);

    //route to get a single user
    this.router.get('/:id', userAuth, this.UserController.getUser);

    //route to get a single mover
    this.router.get('/:id', userAuth, this.UserController.getUser);

    //route to update a single user
    // this.router.put('/:_id', this.UserController.updateUser);

    //route to delete a single user
    // this.router.delete('/:_id', this.UserController.deleteUser);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
