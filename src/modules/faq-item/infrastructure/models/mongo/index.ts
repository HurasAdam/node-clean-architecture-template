/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import mongoose, { Document, Schema, Types } from "mongoose";

export interface FaqItemDocument extends Document {
  faqId: Types.ObjectId;
  question: string;
  answer: string;
  order: number;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const faqItemSchema = new Schema<FaqItemDocument>(
  {
    faqId: {
      type: Schema.Types.ObjectId,
      ref: "Faq",
      required: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

faqItemSchema.index({ faqId: 1, order: 1 });

export const FaqItemModel = mongoose.model<FaqItemDocument>(
  "FaqItem",
  faqItemSchema,
);
