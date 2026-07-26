import { WorkspacePermissions } from "../infrastructure/models/mongo";

export class WorkspaceMemberEntity {
  id: string;
  userId: string;
  workspaceId: string;
  permissions: WorkspacePermissions;
  joinedAt: string;
  constructor(
    id: string,
    userId: string,
    workspaceId: string,
    permissions: WorkspacePermissions,
    joinedAt: string,
  ) {
    this.id = id;
    ((this.userId = userId),
      (this.workspaceId = workspaceId),
      (this.permissions = permissions));
    this.joinedAt = joinedAt;
  }
}
