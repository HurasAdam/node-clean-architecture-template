import { Model } from "mongoose";
import { IWorkspaceRepository } from "../../../domain/repository.interface";
import { AddWorkspaceDto } from "../../../dto/add";
import { UpdateWorkspaceDto } from "../../../dto/update";
import { WorkspaceDocument } from "../../models/mongo";

export class WorkspaceRepository implements IWorkspaceRepository {
  private model;
  constructor(model: Model<WorkspaceDocument>) {
    this.model = model;
  }

  add(userId: string, payload: AddWorkspaceDto) {
    return this.model.create({ ...payload, owner: userId });
  }

  find() {
    return this.model.find({});
  }
  findOne(id: string) {
    return this.model.findById(id);
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
