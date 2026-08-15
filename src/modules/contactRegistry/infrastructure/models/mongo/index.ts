import mongoose from "mongoose";

export interface ContactRecordDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  topicId: mongoose.Types.ObjectId;
  type: "phone" | "message";
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactRecordSchema = new mongoose.Schema<ContactRecordDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["phone", "message"],
      required: true,
      index: true,
    },

    note: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ContactRecordModel = mongoose.model<ContactRecordDocument>(
  "ContactRecord",
  contactRecordSchema,
);
