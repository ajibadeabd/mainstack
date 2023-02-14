import { Request, Response } from "express";
import { IGetAllProductsQuery, IProduct, IUpdateProductRequest } from "index";
import { Model } from "mongoose";
import { Product as Schema } from "../models";

class ProductController {
  private productSchema;

  // Constructor that accepts a Mongoose model for the Product collection.
  constructor(Product: Model<IProduct, {}, {}, {}, any>) {
    this.productSchema = Product;
  }

  // Route handler for getting all products.
  getAllProducts = async (
    req: Request<{}, {}, {}, IGetAllProductsQuery>,
    res: Response
  ): Promise<Response<IProduct[]>> => {
    try {
      let { page = 1, limit = 10 } = req.query;
      const products = await this.productSchema
        .find()
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));
      return res.status(200).json(products);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Route handler for getting a product by ID.
  getProductById = async (
    req: Request,
    res: Response
  ): Promise<Response<IProduct>> => {
    try {
      const product = await this.getProduct({ _id: req.params.id });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Route handler for updating a product by ID.
  updateProduct = async (
    req: Request,
    res: Response
  ): Promise<Response<IProduct>> => {
    const { name, description, price }: IUpdateProductRequest = req.body;
    try {
      const updatedProduct = await this.productSchema.findByIdAndUpdate(
        req.params.id,
        { name, description, price },
        { new: true }
      );
      if (updatedProduct) {
        return res.status(200).json(updatedProduct);
      } else {
        return res.status(404).json({ message: "Product not found" });
      }
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  // Private method for getting a product based on a filter.
  private getProduct = async (filterData: { [key: string]: string }) => {
    return this.productSchema.findOne(filterData);
  };

  // Route handler for creating a new product.
  createProduct = async (req: Request, res: Response) => {
    const { name, description, price }: IUpdateProductRequest = req.body;
    const product = await this.getProduct({ name });
    if (product) {
      return res.status(201).json({ message: "product already exist" });
    }
    const newProduct = new this.productSchema({ name, description, price });
    try {
      const savedProduct = await newProduct.save();
      return res.status(201).json(savedProduct);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
      const deletedProduct = await this.productSchema.findByIdAndDelete(
        req.params.id
      );
      if (!deletedProduct)
        return res.status(404).json({ message: "Product not found" });
      return res.status(200).json({ message: "Product deleted" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
}

export const productController = new ProductController(Schema); // schema was pass here to follow dependency inversion principle
