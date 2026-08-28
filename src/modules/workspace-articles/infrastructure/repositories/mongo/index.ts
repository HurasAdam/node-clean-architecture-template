import { Model } from "mongoose";
import { IWorkspaceArticleRepository } from "../../../domain/repository.interface";
import { WorkspaceArticleEntity } from "../../../domain/workspace-folder.entity";
import { UpdateWorkspaceArticleDto } from "../../../dto/update";
import { WorkspaceArticleDocument } from "../../models/mongo";

export class WorkspaceArticleRepository implements IWorkspaceArticleRepository {
  private model;

  constructor(model: Model<WorkspaceArticleDocument>) {
    this.model = model;
  }

  toDomain(document: WorkspaceArticleDocument) {
    return new WorkspaceArticleEntity(
      document._id.toString(),
      document.title,
      document.workspaceId.toString(),
      document.folderId.toString(),
      document.label,
      document.createdBy.toString(),
      document.createdAt,
    );
  }

  async add(userId: string, payload: {}): Promise<WorkspaceArticleEntity> {
    const document = await this.model.create({
      ...payload,
      createdBy: userId,
    });

    return this.toDomain(document);
  }

  async findOne(
    articleId: string,
    workspaceId: string,
  ): Promise<WorkspaceArticleEntity | null> {
    const doc = await this.model.findOne({
      _id: articleId,
      workspaceId,
    });
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findById(articleId: string) {
    const doc = await this.model.findById(articleId);
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findByFolder(
    userId: string,
    workspaceId: string,
    folderId: string,
  ): Promise<WorkspaceArticleEntity[]> {
    const documents = await this.model.find({
      workspaceId,
      folderId,
    });

    return documents.map((doc) => this.toDomain(doc));
  }

  async countByFolder(workspaceId: string, folderId: string): Promise<number> {
    return this.model.countDocuments({
      workspaceId,
      folderId,
    });
  }

  async updateOne(
    articleId: string,
    payload: UpdateWorkspaceArticleDto,
  ): Promise<WorkspaceArticleEntity | null> {
    const doc = await this.model.findByIdAndUpdate(articleId, payload, {
      new: true,
    });

    if (!doc) return null;

    return this.toDomain(doc);
  }
}
