/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import UserUtils from '../utils/user.util';
import GoogleAuth from '../config/googleauthconfig';
import axios from 'axios';
import { IUser } from '../interfaces/user.interface';
import IdGenerator from '../utils/userId.util';

class UserController {
  public UserService = new userService();
  public UserUtils = new UserUtils();
  private client = new GoogleAuth().client;
  private idGenerate = new IdGenerator();
  private redirectUrl: string;

  constructor () {
    this.redirectUrl = process.env.USER_REDIRECT_URL;
  }

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
      const data = await this.UserService.getUser(req.params.id);
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
        const _id = this.idGenerate.getId();
        const data = await this.UserService.newUser(
          await this.UserUtils.hashPassword({...req.body, _id })
        );
        console.log(data);
        return res.status(HttpStatus.OK).json({
          data: {
            token: await this.UserUtils.signToken({
              email: data.email,
              userId: data._id,
              role: data.role
            }),
            role: data.role,
            user: data._id,
            email: data.email
          },
          message: 'User created successfully',
          code: HttpStatus.OK
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
            }),
            username: userExists.accountName,
            email: userExists.email,
            userId: userExists._id
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

  /**
   * Controller to handle google callback
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {function} NextFunction
   */

  public googleCallback = async (req: Request, res: Response): Promise<any> => {
    // console.log('entered');
    try {
      const code = req.query;
      const { tokens } = await this.client.getToken(code);
      const {data: googleData} = await
      axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`
        }
      });
      // console.log(googleData);
     const userExists = await this.UserService.getUserByEmail(googleData.email);
     const _id = this.idGenerate.getId();
      if ( !userExists ) {
        const data = await this.UserService.newUser({
          email: googleData.email,
          role: 'user',
          accountName: googleData.name,
          isGoogleUser: true,
          isVerified: true,
          password: '',
          businessLogo: googleData.picture,
          _id
        } as IUser);
        const token = await this.UserUtils.signToken({
          email: data.email,
          userId: data._id,
          role: data.role
        });
        // eslint-disable-next-line max-len
        return res.redirect(`${this.redirectUrl}/auth/login/${data._id}/${token}`);
      } else if (userExists) {
        // res.redirect('http://localhost:3000/dashboard/home')
        const token = await this.UserUtils.signToken({
          email: userExists.email,
          userId: userExists._id,
          role: userExists.role
        })
        res.cookie('jwt', token, {
          httpOnly: true, //accessible only by web server
          secure: true, //https
          sameSite: false, //cross-site cookie
          maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        });
         // eslint-disable-next-line max-len
        res.redirect(`${this.redirectUrl}/auth/login/${userExists._id}/${token}`);
      }
      } catch(error) {
      // console.error(error);
      res.status(HttpStatus.CONFLICT).json({
        code: HttpStatus.CONFLICT,
        data: '',
        message: 'An error encoutered'
      })
    }
  }
}

export default UserController;
