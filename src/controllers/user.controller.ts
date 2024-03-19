/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import UserUtils from '../utils/user.util';

class UserController {
  public UserService = new userService();
  public UserUtils = new UserUtils();

  /**
   * Controller to get all users available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.getAllUsers();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All users fetched successfully'
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
  public getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.getUser(req.params._id);
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
  public newUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      console.log(req.body);
      const userExists = await this.UserService.getUserByEmail(req.body.email);
      if (!userExists) {
        const data = await this.UserService.newUser(
          await this.UserUtils.hashPassword(req.body)
        );
        console.log(data);
        return res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data: {
            userId: data._id
          },
          message: 'User created successfully'
        });
      } else {
        return res.status(HttpStatus.CONFLICT).json({
          code: HttpStatus.CONFLICT,
          data: '',
          message: 'Email already in use'
        });
      }
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to update a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.updateUser(req.params._id, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'User updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to delete a single user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await this.UserService.deleteUser(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: {},
        message: 'User deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  /**
   * Controller to login a user
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {function} NextFunction
   */
  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const userExists = await this.UserService.getUserByEmail(req.body.email);
      if (userExists) {
        const passwordCorrect = await compare(
          req.body.password,
          userExists.password
        );
        if (!passwordCorrect) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            data: '',
            message: 'Password is not correct',
            code: HttpStatus.BAD_REQUEST
          });
        }
        return res.status(HttpStatus.OK).json({
          data: {
            token: await this.UserUtils.signToken({
              email: userExists.email,
              userId: userExists._id,
              role: userExists.role
            })
          },
          message: 'Okay',
          code: HttpStatus.OK
        });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: '',
        message: 'User doesnt exist',
        code: HttpStatus.BAD_REQUEST
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
