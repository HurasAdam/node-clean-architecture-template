import { Model } from "mongoose";
import { IWorkspaceArticleRepository } from "../../../domain/repository.interface";
import { WorkspaceArticleEntity } from "../../../domain/workspace-folder.entity";
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
      document.marker,
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
}
