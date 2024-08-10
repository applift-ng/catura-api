/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import { v2 as cloudinary} from 'cloudinary';
import { NextFunction, Request, Response } from 'express';


const uploader = cloudinary.uploader;
const cloudinaryConfig = 
(req: Request,res: Response, next: NextFunction): void => {
    cloudinary.config({
        cloud_name: 'dv5v8l2lr', 
        api_key: '777541867955751', 
        api_secret: 'qRDV0bXVnLn1mESFmWo5hBxldtA',
    });
    next();
}

export { uploader, cloudinaryConfig};