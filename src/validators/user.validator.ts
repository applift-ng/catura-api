/* eslint-disable prettier/prettier */
import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class UserValidator {
  public newUser = (req: Request, res: Response, next: NextFunction): void => {
    console.log(req.body);
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
      isGoogleUser: Joi.boolean().required(),
      isVerified: Joi.boolean().required(),
      currentAddress: Joi.string(),
      bankVerificationNumber: Joi.string(),
      phone: Joi.string()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };
}

export default UserValidator;
