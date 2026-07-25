import { Model } from "mongoose";
import { IWorkspaceMemberRepository } from "../../../domain/repository.interface";
import { WorkspaceMemberEntity } from "../../../domain/workspace-member.entity";
import { WorkspaceMemberDocument } from "../../models/mongo";

export class workspaceMemberRepository implements IWorkspaceMemberRepository {
  private model;

  constructor(model: Model<WorkspaceMemberDocument>) {
    this.model = model;
  }

  private toDomain(document: WorkspaceMemberDocument) {
    return new WorkspaceMemberEntity(
      document.workspaceId.toString(),
      document.userId.toString(),
      document.permissions,
      document.joinedAt.toString(),
    );
  }

  add(payload: unknown, userId: string): void {
    this.model.create(payload, userId);
  }
}
