/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Document, Schema, Types, model } from "mongoose";

export type FaqStatus = "PUBLIC" | "UNPUBLIC";

export interface FaqDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  isDefault: boolean;
  iconKey: string;
  status: FaqStatus;
  createdBy: Types.ObjectId;
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
      enum: ["PUBLIC", "UNPUBLIC"],
      default: "UNPUBLIC",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const FaqModel = model<FaqDocument>("Faq", faqSchema);

export default FaqModel;
