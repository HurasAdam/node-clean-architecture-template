import { WorkspaceArticleEntity } from "./workspace-folder.entity";

export interface IWorkspaceArticleRepository {
  add(userId: string, payload: {}): Promise<WorkspaceArticleEntity>;
  findOne(
    articleId: string,
    workspaceId: string,
  ): Promise<WorkspaceArticleEntity | null>;
  findByFolder(
    userId: string,
    workspaceId: string,
    folderId: string,
  ): Promise<WorkspaceArticleEntity[]>;
  countByFolder(workspaceId: string, folderId: string): Promise<number>;
}
