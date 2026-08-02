import { Document, Schema, Types, model } from "mongoose";

export interface WorkspaceArticleResponseVariantDocument extends Document {
  articleId: Types.ObjectId;
  variantName: string;
  variantContent: string;
  order: number;

  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const workspaceArticleResponseVariantSchema =
  new Schema<WorkspaceArticleResponseVariantDocument>(
    {
      articleId: {
        type: Schema.Types.ObjectId,
        ref: "WorkspaceArticle",
        required: true,
      },

      variantName: {
        type: String,
        required: true,
        trim: true,
      },

      variantContent: {
        type: String,
        required: true,
      },

      order: {
        type: Number,
        default: 0,
      },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    },
  );

workspaceArticleResponseVariantSchema.index({
  articleId: 1,
});

workspaceArticleResponseVariantSchema.index(
  {
    articleId: 1,
    variantName: 1,
  },
  {
    unique: true,
  },
);

workspaceArticleResponseVariantSchema.index({
  articleId: 1,
  order: 1,
});

export const WorkspaceArticleResponseVariantModel =
  model<WorkspaceArticleResponseVariantDocument>(
    "workspaceArticleResponseVariant",
    workspaceArticleResponseVariantSchema,
  );
