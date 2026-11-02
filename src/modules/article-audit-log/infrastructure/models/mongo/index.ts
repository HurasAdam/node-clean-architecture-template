import { Document, Schema, Types, model } from "mongoose";

export type ArticleAuditLogEventType =
  | "ARTICLE_CREATED"
  | "ARTICLE_APPROVED"
  | "ARTICLE_TITLE_UPDATED"
  | "ARTICLE_INTERNAL_NOTE_UPDATED"
  | "ARTICLE_PRODUCT_UPDATED"
  | "ARTICLE_CATEGORY_UPDATED"
  | "ARTICLE_TAGS_UPDATED"
  | "VARIANT_CREATED"
  | "VARIANT_NAME_UPDATED"
  | "VARIANT_CONTENT_UPDATED"
  | "VARIANT_UPDATED"
  | "VARIANT_DELETED";

export interface ArticleAuditLogChange {
  field: string;
  before: unknown;
  after: unknown;
}

export interface ArticleAuditLogDocument extends Document {
  articleId: Types.ObjectId;
  variantId?: Types.ObjectId;

  eventType: ArticleAuditLogEventType;

  actor: {
    userId: Types.ObjectId;
    name: string;
    surname: string;
    email: string;
  };

  changes: ArticleAuditLogChange[];

  createdAt: Date;
}

const ArticleAuditLogSchema = new Schema<ArticleAuditLogDocument>(
  {
    articleId: {
      type: Schema.Types.ObjectId,
      ref: "WorkspaceArticle",
      required: true,
    },

    variantId: {
      type: Schema.Types.ObjectId,
      ref: "ArticleResponseVariant",
    },

    eventType: {
      type: String,
      required: true,
      enum: [
        "ARTICLE_CREATED",
        "ARTICLE_APPROVED",
        "ARTICLE_TITLE_UPDATED",
        "ARTICLE_INTERNAL_NOTE_UPDATED",
        "ARTICLE_PRODUCT_UPDATED",
        "ARTICLE_CATEGORY_UPDATED",
        "ARTICLE_TAGS_UPDATED",
        "VARIANT_CREATED",
        "VARIANT_NAME_UPDATED",
        "VARIANT_CONTENT_UPDATED",
        "VARIANT_UPDATED",
        "VARIANT_DELETED",
      ],
    },

    actor: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      surname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },

    changes: [
      {
        field: {
          type: String,
          required: true,
        },
        before: {
          type: Schema.Types.Mixed,
          default: null,
        },
        after: {
          type: Schema.Types.Mixed,
          default: null,
        },
      },
    ],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
    versionKey: false,
    collection: "article_audit_logs",
  },
);

ArticleAuditLogSchema.index({
  articleId: 1,
  createdAt: -1,
});

export const ArticleAuditLogModel = model<ArticleAuditLogDocument>(
  "ArticleAuditLog",
  ArticleAuditLogSchema,
);
