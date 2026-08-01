import { Model } from "mongoose";
import { IWorkspaceFolderRepository } from "../../../domain/repository.interface";
import { WorkspaceFolderEntity } from "../../../domain/workspace-folder.entity";
import { AddWorkspaceFolderDto } from "../../../dto/add";
import { UpdateWorkspaceFolderDto } from "../../../dto/update";
import { WorkspaceFolderDocument } from "../../models/mongo";

export class workspaceFolderRepository implements IWorkspaceFolderRepository {
  private model;

  constructor(model: Model<WorkspaceFolderDocument>) {
    this.model = model;
  }

  toDomain(document: WorkspaceFolderDocument): WorkspaceFolderEntity {
    return new WorkspaceFolderEntity(
      document._id.toString(),
      document.name,
      document.description,
    );
  }

  add(userId: string, payload: AddWorkspaceFolderDto): Promise<unknown> {
    return this.model.create({ ...payload, createdBy: userId });
  }

  async findAllByWorkspace(workspaceId: string) {
    const docs = await this.model.find({ workspaceId });
    return docs.map((doc) => this.toDomain(doc));
  }

  async updateOne(
    folderId: string,
    payload: UpdateWorkspaceFolderDto,
  ): Promise<WorkspaceFolderEntity | null> {
    const doc = await this.model.findByIdAndUpdate(
      folderId,
      { $set: payload },
      { new: true, runValidators: true },
    );

    if (!doc) return null;
    return this.toDomain(doc);
  }

  async deleteOne(folderId: string): Promise<boolean> {
    const res = await this.model.findByIdAndDelete(folderId);
    return !!res;
  }
}
