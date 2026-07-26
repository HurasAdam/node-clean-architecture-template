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
}
