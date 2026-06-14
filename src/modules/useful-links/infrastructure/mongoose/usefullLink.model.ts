import { Document, Schema, model } from "mongoose";

export interface UsefullLinkDocument extends Document {
  name: string;
  url: string;
  description?: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  linkCategory: Schema.Types.ObjectId;
}

const UsefullLinkSchema = new Schema<UsefullLinkDocument>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
    linkCategory: { type: Schema.Types.ObjectId, ref: "usefulLinkCategory" },
  },

  { timestamps: true },
);

const UsefullLinkModel = model<UsefullLinkDocument>(
  "UsefullLink",
  UsefullLinkSchema,
);

export default UsefullLinkModel;
