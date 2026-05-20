/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { model, Schema, Types } from "mongoose";

export interface ProductTopicDocument extends Document {
  name: string;
  product: Types.ObjectId;
  createdBy: Types.ObjectId;
}

const productTopicschema = {
  name: { type: String, required: true, unique: true, trim: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
};

const schema = new Schema(productTopicschema, { timestamps: true });

const ProductTopicModel = model<ProductTopicDocument>("ProductTopic", schema);
export default ProductTopicModel;
