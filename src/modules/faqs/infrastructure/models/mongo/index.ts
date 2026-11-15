/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import mongoose, { Document, Schema, Types, model } from "mongoose";

export type FaqStatus = "published" | "unpublished";

export interface FaqDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  isDefault: boolean;
  iconKey: string;
  status: FaqStatus;
  createdBy: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const faqSchema = new Schema<FaqDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    iconKey: {
      type: String,
      default: "ScrollText",
    },
    status: {
      type: String,
      enum: ["published", "unpublished"],
      default: "unpublished",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const FaqModel = model<FaqDocument>("Faq", faqSchema);

export default FaqModel;
