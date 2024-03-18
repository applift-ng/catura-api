/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import productService from '../services/product.service';
import { Request, Response, NextFunction } from 'express';

class ProductController {
  public ProductService = new productService();

  /**
   * Controller to get all Products available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.ProductService.getAllProducts();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All Products fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get a Product
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.ProductService.getProduct(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Product fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to create new Product
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public newProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.ProductService.newProduct(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Product created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to update a Product
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data =
        await this.ProductService.updateProduct(req.params._id, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Product updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to delete a single Product
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await this.ProductService.deleteProduct(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: {},
        message: 'Product deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
