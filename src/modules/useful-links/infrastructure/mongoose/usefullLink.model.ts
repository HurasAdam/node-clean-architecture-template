import { Document, Schema, model } from "mongoose";

export interface UsefullLinkDocument extends Document {
  name: string;
  url: string;
  description?: string;
  isFeatured: boolean;
  linkCategory: Schema.Types.ObjectId;
  createdAt: Date;
  createdBy: Schema.Types.ObjectId;

  updatedAt: Date;
}

const UsefullLinkSchema = new Schema<UsefullLinkDocument>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
    linkCategory: { type: Schema.Types.ObjectId, ref: "usefulLinkCategory" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },

  { timestamps: true },
);

const UsefullLinkModel = model<UsefullLinkDocument>(
  "UsefullLink",
  UsefullLinkSchema,
);

export default UsefullLinkModel;
