import { Model, Types } from "mongoose";
import { IWorkspaceMemberRepository } from "../../../domain/repository.interface";
import { WorkspaceMemberEntity } from "../../../domain/workspace-member.entity";
import {
  WorkspaceMemberDocument,
  WorkspacePermissions,
} from "../../models/mongo";

export class workspaceMemberRepository implements IWorkspaceMemberRepository {
  private model;

  constructor(model: Model<WorkspaceMemberDocument>) {
    this.model = model;
  }

  private toDomain(document: WorkspaceMemberDocument) {
    return new WorkspaceMemberEntity(
      document._id.toString(),
      document.userId.toString(),
      document.workspaceId.toString(),
      document.permissions,
      document.joinedAt.toString(),
    );
  }

  async addMany(
    payload: {
      workspaceId: string;
      userId: string;
      permissions: WorkspacePermissions;
    }[],
  ): Promise<WorkspaceMemberEntity[]> {
    const documents = await this.model.insertMany(
      payload.map((member) => ({
        workspaceId: new Types.ObjectId(member.workspaceId),
        userId: new Types.ObjectId(member.userId),
        permissions: member.permissions,
      })),
    );

    return documents.map((document) => this.toDomain(document));
  }

  async findByWorkspaceId(
    workspaceId: string,
  ): Promise<WorkspaceMemberEntity[]> {
    const docs = await this.model.find({ workspaceId });
    return docs.map((doc) => this.toDomain(doc));
  }

  async findByUserAndWorkspace(
    userId: string,
    workspaceId: string,
  ): Promise<WorkspaceMemberEntity | null> {
    const workspace = await this.model.findOne({
      userId,
      workspaceId,
    });

    if (!workspace) return null;

    return this.toDomain(workspace);
  }

  async findByMemberIdAndWorkspace(
    memberId: string,
    workspaceId: string,
  ): Promise<WorkspaceMemberEntity | null> {
    const document = await this.model.findOne({
      _id: memberId,
      workspaceId,
    });

    if (!document) {
      return null;
    }

    return this.toDomain(document);
  }

  async deleteOne(memberId: string) {
    const doc = await this.model.findByIdAndDelete(memberId);
    if (!doc) return null;
    return this.toDomain(doc);
  }
}
