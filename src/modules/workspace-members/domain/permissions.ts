import { WorkspacePermissions } from "../infrastructure/models/mongo";

export const OWNER_PERMISSIONS: WorkspacePermissions = {
  addFolder: true,
  editFolder: true,
  deleteFolder: true,
  addArticle: true,
  editArticle: true,
  deleteArticle: true,
  addMember: true,
  removeMember: true,
  editWorkspace: true,
};

export const DEFAULT_MEMBER_PERMISSIONS: WorkspacePermissions = {
  addFolder: false,
  editFolder: false,
  deleteFolder: false,
  addArticle: false,
  editArticle: false,
  deleteArticle: false,
  addMember: false,
  removeMember: false,
  editWorkspace: false,
};
