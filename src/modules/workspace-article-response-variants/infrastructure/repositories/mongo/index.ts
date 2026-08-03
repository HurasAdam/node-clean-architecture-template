import { Model } from "mongoose";
import { WorkspaceArticleResponseVariantEntity } from "../../../domain/entity";
import { WorkspaceArticleResponseVariantDocument } from "../../models/mongo";

export class WorkspaceArticleResponseVariantRepository {
  private model: Model<WorkspaceArticleResponseVariantDocument>;

  constructor(model: Model<WorkspaceArticleResponseVariantDocument>) {
    this.model = model;
  }

  toDomain(
    document: WorkspaceArticleResponseVariantDocument,
  ): WorkspaceArticleResponseVariantEntity {
    return new WorkspaceArticleResponseVariantEntity(
      document._id.toString(),
      document.articleId.toString(),
      document.variantName,
      document.variantContent,
      document.order,
      document.createdBy.toString(),
      document.updatedBy?.toString() ?? null,
      document.createdAt,
      document.updatedAt,
    );
  }

  async add(
    userId: string,
    payload: {
      workspaceArticleId: string;
      variantName: string;
      variantContent: string;
      order: number;
    },
  ) {
    const document = await this.model.create({
      articleId: payload.workspaceArticleId,
      variantName: payload.variantName,
      variantContent: payload.variantContent,
      order: payload.order,
      createdBy: userId,
    });

    return this.toDomain(document);
  }
}
