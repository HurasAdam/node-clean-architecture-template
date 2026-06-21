/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { model, Schema, Types } from "mongoose";

export interface ArticleDocument extends Document {
  title: string;
  internalNote: string;
  status: "DRAFT" | "APPROVED" | "REJECTED" | "PENDING_REVIEW" | "ARCHIVED";
  importantMarker?: "star" | "pin" | "warning" | "none";
  product: Types.ObjectId;
  category: Types.ObjectId;
  tags: Types.ObjectId[];

  createdBy: Types.ObjectId;
  verifiedBy: Types.ObjectId;
  lastUpdatedBy?: Types.ObjectId;

  followers: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

const articleSchema = new Schema<ArticleDocument>(
  {
    title: { type: String, required: true },

    internalNote: { type: String },
    status: {
      type: String,
      enum: ["DRAFT", "PENDING_REVIEW", "APPROVED", "REJECTED", "ARCHIVED"],
      default: "DRAFT",
      required: true,
    },

    importantMarker: {
      type: String,
      enum: ["star", "pin", "warning"],
      default: null,
    },

    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    // tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],

    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },

    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  },
);

const ArticleModel = model("Article", articleSchema);
export default ArticleModel;
