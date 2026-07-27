import { Model } from "mongoose";
import { IWorkspaceRepository } from "../../../domain/repository.interface";
import { WorkspaceEntity } from "../../../domain/workspace.entity";
import { AddWorkspaceDto } from "../../../dto/add";
import { UpdateWorkspaceDto } from "../../../dto/update";
import { WorkspaceDocument } from "../../models/mongo";

export class WorkspaceRepository implements IWorkspaceRepository {
  private model;
  constructor(model: Model<WorkspaceDocument>) {
    this.model = model;
  }

  private toDomain(doc: WorkspaceDocument): WorkspaceEntity {
    return new WorkspaceEntity(
      doc._id.toString(),
      doc.name,
      doc.labelColor,
      doc.iconKey,
      doc.owner.toString(),
      doc.description,
      doc.inviteCode,
    );
  }

  async add(
    userId: string,
    payload: AddWorkspaceDto,
  ): Promise<WorkspaceEntity> {
    const doc = await this.model.create({ ...payload, owner: userId });
    return this.toDomain(doc);
  }

  async find(): Promise<WorkspaceEntity[]> {
    const docs = await this.model.find({});
    return docs.map((doc) => this.toDomain(doc));
  }
  async findOne(id: string): Promise<WorkspaceEntity | null> {
    const doc = await this.model.findById(id);
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async update(id: string, payload: UpdateWorkspaceDto) {
    const doc = await this.model.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true, runValidators: true },
    );

    if (!doc) return null;
  }
}
