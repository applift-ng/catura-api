/* eslint-disable prettier/prettier */
import Product from '../models/product.model';
import { IProduct } from '../interfaces/product.interface';

class ProductService {

  //get all Products
  public getAllProducts = async (): Promise<IProduct[]> => {
    const data = await Product.find();
    return data;
  };

  //create new Product
  public newProduct = async (body: IProduct): Promise<IProduct> => {
    const data = await Product.create(body);
    return data;
  };

  //update a Product
  public updateProduct = async (
    _id: string,
    body: IProduct
  ): Promise<IProduct> => {
    const data = await Product.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    return data;
  };

  //delete a Product
  public deleteProduct = async (_id: string): Promise<string> => {
    await Product.findByIdAndDelete(_id);
    return '';
  };

  //get a single Product
  public getProduct = async (_id: string): Promise<IProduct> => {
    const data = await Product.findById(_id);
    return data;
  };
}

export default ProductService;
