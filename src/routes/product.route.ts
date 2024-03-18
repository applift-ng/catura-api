/* eslint-disable prettier/prettier */
import express, { IRouter } from 'express';
import ProductController from '../controllers/product.controller';
// import ProductValidator from '../validators/Product.validator';
// import { ProductAuth } from '../middlewares/auth.middleware';

class ProductRoutes {
  private ProductController = new ProductController();
  private router = express.Router();
//   private ProductValidator = new ProductValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    //route to get all Products
    this.router.get('', this.ProductController.getAllProducts);

    //route to create a new Product
    this.router.post(
      '',
      //   this.ProductValidator.newProduct,
      this.ProductController.newProduct
    );

    //route to get a single Product
    this.router.get('/:_id', this.ProductController.getProduct);

    //route to update a single Product
    this.router.put('/:_id', this.ProductController.updateProduct);

    //route to delete a single Product
    this.router.delete('/:_id', this.ProductController.deleteProduct);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default ProductRoutes;
