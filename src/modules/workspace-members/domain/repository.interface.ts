import { WorkspacePermissions } from "../infrastructure/models/mongo";
import { WorkspaceMemberEntity } from "./workspace-member.entity";

export interface IWorkspaceMemberRepository {
  addMany: (
    payload: {
      workspaceId: string;
      userId: string;
      permissions: WorkspacePermissions;
    }[],
  ) => Promise<WorkspaceMemberEntity[]>;

  findByWorkspaceId: (workspaceId: string) => Promise<WorkspaceMemberEntity[]>;

  findByUserAndWorkspace: (
    userId: string,
    workspaceId: string,
  ) => Promise<WorkspaceMemberEntity | null>;

  findByMemberIdAndWorkspace(
    memberId: string,
    workspaceId: string,
  ): Promise<WorkspaceMemberEntity | null>;

  updatePermissions(
    memberId: string,
    permissions: WorkspacePermissions,
  ): Promise<WorkspaceMemberEntity | null>;

  deleteOne: (memberId: string) => Promise<WorkspaceMemberEntity | null>;
}
