/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Document, model, Schema, Types } from "mongoose";

export type ArticleReviewStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "APPROVED"
  | "REJECTED";

export type ArticlePublicationStatus = "UNPUBLISHED" | "PUBLISHED" | "ARCHIVED";

export interface ArticleDocument extends Document {
  title: string;
  internalNote: string;

  reviewStatus: ArticleReviewStatus;
  publicationStatus: ArticlePublicationStatus;
  reviewNote: string | null;

  importantMarker: "star" | "pin" | "warning" | null;

  product: Types.ObjectId;
  category: Types.ObjectId;
  tags: Types.ObjectId[];

  createdBy: Types.ObjectId;
  verifiedBy: Types.ObjectId | null;
  lastVerifiedAt: Date | null;
  firstApprovedAt: Date | null;

  lastUpdatedBy?: Types.ObjectId;

  followers: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

const articleSchema = new Schema<ArticleDocument>(
  {
    title: { type: String, required: true },

    internalNote: { type: String },

    reviewStatus: {
      type: String,
      enum: ["DRAFT", "PENDING_REVIEW", "APPROVED", "REJECTED"],
      default: "DRAFT",
      required: true,
    },

    publicationStatus: {
      type: String,
      enum: ["UNPUBLISHED", "PUBLISHED", "ARCHIVED"],
      default: "UNPUBLISHED",
      required: true,
    },

    importantMarker: {
      type: String,
      enum: ["star", "pin", "warning"],
      default: null,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    lastVerifiedAt: {
      type: Date,
      default: null,
    },

    firstApprovedAt: {
      type: Date,
      default: null,
    },

    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const ArticleModel = model<ArticleDocument>("Article", articleSchema);

export default ArticleModel;
