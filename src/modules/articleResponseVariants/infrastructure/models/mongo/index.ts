import { Document, Schema, Types, model } from "mongoose";

export interface ArticleResponseVariantDocument extends Document {
  articleId: Types.ObjectId;

  variantName: string;
  variantContent: string;

  order: number;

  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const ArticleResponseVariantSchema = new Schema<ArticleResponseVariantDocument>(
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
      required: true,
      default: 0,
      min: 0,
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

ArticleResponseVariantSchema.index({
  articleId: 1,
  order: 1,
});

ArticleResponseVariantSchema.index(
  {
    articleId: 1,
    variantName: 1,
  },
  {
    unique: true,
  },
);

export const ArticleResponseVariantModel =
  model<ArticleResponseVariantDocument>(
    "ArticleResponseVariant",
    ArticleResponseVariantSchema,
  );
