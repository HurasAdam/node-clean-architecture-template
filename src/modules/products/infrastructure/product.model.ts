/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Document, Schema, Types, model } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  createdBy: Types.ObjectId;
  labelColor: string;
}

const productSchema = {
  name: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  labelColor: { type: String, required: true, default: "#475569" },
};

const schema = new Schema<ProductDocument>(productSchema, { timestamps: true });

const ProductModel = model<ProductDocument>("Product", schema);
export default ProductModel;
