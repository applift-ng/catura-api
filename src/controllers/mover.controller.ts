/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import moverService from '../services/mover.service';
import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import MoverUtils from '../utils/mover.util';
import GoogleAuth from '../config/googleauthconfig';
import axios from 'axios';
import { IMover } from '../interfaces/mover.interface';
import IdGenerator from '../utils/userId.util';
import AppUtils from '../utils/app.util';

class MoverController {
  public MoverService = new moverService();
  public MoverUtils = new MoverUtils();
  private client = new GoogleAuth().client;
  private idGenerate = new IdGenerator();
  private redirectUrl: string;
  private AppUtils = new AppUtils();

  constructor () {
    this.redirectUrl = process.env.USER_REDIRECT_URL;
  }

  /**
   * Controller to get all users available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getAllMovers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.MoverService.getAllMovers();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All movers fetched successfully'
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
      const data = await this.MoverService.getMover(req.params.id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Mover fetched successfully'
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
      // console.log(req.body);
      const email = this.AppUtils.properEmail(req.body.email);
      const userExists =
        await this.MoverService.getMoverByEmail(email);
      if (!userExists) {
        const _id = this.idGenerate.getId();
        const data = await this.MoverService.newMover(
          await this.MoverUtils.hashPassword({...req.body, _id, email: email})
        );
        // console.log(data);
        return res.status(HttpStatus.OK).json({
          data: {
            token: await this.MoverUtils.signToken({
              email: data.email,
              moverId: data._id,
            }),
            user: data._id,
            email: data.email
          },
          message: 'Mover created successfully',
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
  public updateMover = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data =
        await this.MoverService.updateMover(req.params._id, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Mover updated successfully'
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
  public deleteMover = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await this.MoverService.deleteMover(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: {},
        message: 'Mover deleted successfully'
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
  public loginMover = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const email = this.AppUtils.properEmail(req.body.email);
      const userExists =
        await this.MoverService.getMoverByEmail(email);
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
            token: await this.MoverUtils.signToken({
              email: userExists.email,
              moverId: userExists._id,
            }),
            moverName: userExists.firstName + userExists.lastName,
            email: userExists.email,
            userId: userExists._id,
          },
          message: 'Okay',
          code: HttpStatus.OK
        });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: '',
        message: 'Movnper doesnt exist, sign up',
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
     const userExists =
        await this.MoverService.getMoverByEmail(googleData.email);
      if ( !userExists ) {
        const data =
            await this.MoverService.newMover({
          email: googleData.email,
          accountName: googleData.name,
          isGoogleUser: true,
          isVerified: true,
          password: '',
        } as IMover);
        const token = await this.MoverUtils.signToken({
          email: data.email,
        moverId: data._id,
        });
        // eslint-disable-next-line max-len
        return res.redirect(`${this.redirectUrl}/auth/login/${data._id}/${token}`);
      } else if (userExists) {
        // res.redirect('http://localhost:3000/dashboard/home')
        const token = await this.MoverUtils.signToken({
          email: userExists.email,
          moverId: userExists._id,
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
  public getMoverDetails =
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = req.body;
    // console.log(data);
    try {
    const updatedUser = await this.MoverService.updateMover(data.id, data);
    console.log(updatedUser);
    if(updatedUser) {
      return res.status(HttpStatus.ACCEPTED).json({
        message: 'Details updated successfully, await verification',
        data: {
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          id: updatedUser._id,
        }
      });
    }
    }catch(error) {
      console.error(error);
      next(error)
    }
  }
}

export default MoverController;
