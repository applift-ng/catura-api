/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import UserUtils from '../utils/user.util';
const userUtils = new UserUtils();
/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const { user }: any = await userUtils.verifyToken(bearerToken);
    res.locals.user = user;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};
