import { Schema, model, Document } from "mongoose";

import { IProduct } from "../types/index";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<IProduct>("Product", productSchema);
