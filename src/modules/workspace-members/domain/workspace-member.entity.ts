import { WorkspacePermissions } from "../infrastructure/models/mongo";

export class WorkspaceMemberEntity {
  private userId: string;
  private workspaceId: string;
  private permissions: WorkspacePermissions;
  private joinedAt: string;
  constructor(
    userId: string,
    workspaceId: string,
    permissions: WorkspacePermissions,
    joinedAt: string,
  ) {
    ((this.userId = userId),
      (this.workspaceId = workspaceId),
      (this.permissions = permissions));
    this.joinedAt = joinedAt;
  }
}
