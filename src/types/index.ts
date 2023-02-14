import { Document } from "mongoose";
import { ParsedQs } from "qs";

export interface IGetAllProductsQuery extends ParsedQs {
  page?: string;
  limit?: string;
}

export interface IUpdateProductRequest {
  name: string;
  description: string;
  price: number;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
}

export interface SuccessResponse {
  message: string;
}
