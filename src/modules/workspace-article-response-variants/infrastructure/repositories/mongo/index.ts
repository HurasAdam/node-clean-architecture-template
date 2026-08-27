import { Model } from "mongoose";
import { WorkspaceArticleResponseVariantEntity } from "../../../domain/entity";
import { IWorkspaceArticleResponseVariantRepository } from "../../../domain/repository.interface";
import { WorkspaceArticleResponseVariantDocument } from "../../models/mongo";

export class WorkspaceArticleResponseVariantRepository implements IWorkspaceArticleResponseVariantRepository {
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

  async findAllByArticleId(workspaceArticleId: string) {
    const docs = await this.model.find({ articleId: workspaceArticleId });
    return docs.map((doc) => this.toDomain(doc));
  }

  async findById(responseVariantId: string) {
    const doc = await this.model.findById(responseVariantId);
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async updateOne(responseVariantId: string, payload: {}, userId: string) {
    const doc = await this.model.findByIdAndUpdate(responseVariantId, payload, {
      new: true,
    });
    if (!doc) return null;

    return this.toDomain(doc);
  }

  async findByArticleIdAndVariantName(
    workspaceArticleId: string,
    variantName: string,
    excludeResponseVariantId?: string,
  ) {
    const doc = await this.model.findOne({
      articleId: workspaceArticleId,
      variantName,
      ...(excludeResponseVariantId && {
        _id: { $ne: excludeResponseVariantId },
      }),
    });

    if (!doc) return null;

    return this.toDomain(doc);
  }

  async deleteOne(responseVariantId: string) {
    const doc = await this.model.findByIdAndDelete(responseVariantId);
    if (!doc) return null;
    return this.toDomain(doc);
  }
}
