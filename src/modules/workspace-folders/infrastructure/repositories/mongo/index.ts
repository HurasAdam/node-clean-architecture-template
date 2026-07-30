import { Model } from "mongoose";
import { IWorkspaceFolderRepository } from "../../../domain/repository.interface";
import { AddWorkspaceFolderDto } from "../../../dto/add";
import { WorkspaceFolderDocument } from "../../models/mongo";

export class workspaceFolderRepository implements IWorkspaceFolderRepository {
  private model;

  constructor(model: Model<WorkspaceFolderDocument>) {
    this.model = model;
  }

  add(userId: string, payload: AddWorkspaceFolderDto): Promise<unknown> {
    return this.model.create({ ...payload, createdBy: userId });
  }
}
