import { Document, Schema, Types, model } from "mongoose";

export const WORKSPACE_FOLDER_COLORS = [
  "blue",
  "amber",
  "emerald",
  "violet",
  "rose",
  "orange",
  "sky",
] as const;

export type WorkspaceFolderColor = (typeof WORKSPACE_FOLDER_COLORS)[number];

export interface WorkspaceFolderDocument extends Document {
  workspaceId: Types.ObjectId;
  name: string;
  description: string;
  color: WorkspaceFolderColor;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const workspaceFolderSchema = new Schema<WorkspaceFolderDocument>(
  {
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    color: {
      type: String,
      enum: ["blue", "amber", "emerald", "violet", "rose", "sky", "orange"],
      required: true,
      default: "blue",
    },

    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export const WorkspaceFolderModel = model<WorkspaceFolderDocument>(
  "WorkspaceFolder",
  workspaceFolderSchema,
);
