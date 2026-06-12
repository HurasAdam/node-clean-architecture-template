import { Document, Schema, model } from "mongoose";

export interface UsefulLinkCategoryDocument extends Document {
  name: string;
  isActive: boolean;
  order: Number;
  createdAt: Date;
  updatedAt: Date;
}

const usefulLinkCategorySchema = new Schema<UsefulLinkCategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const UsefulLinkCategoryModel = model<UsefulLinkCategoryDocument>(
  "usefulLinkCategory",
  usefulLinkCategorySchema,
);
