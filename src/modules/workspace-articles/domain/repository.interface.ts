import { UpdateWorkspaceArticleDto } from "../dto/update";
import { WorkspaceArticleEntity } from "./workspace-folder.entity";

export interface IWorkspaceArticleRepository {
  add(userId: string, payload: {}): Promise<WorkspaceArticleEntity>;
  findOne(
    articleId: string,
    workspaceId: string,
  ): Promise<WorkspaceArticleEntity | null>;

  findById(articleId: string): Promise<WorkspaceArticleEntity | null>;
  findByFolder(
    userId: string,
    workspaceId: string,
    folderId: string,
  ): Promise<WorkspaceArticleEntity[]>;

  findOneByTitleAndFolder(
    folderId: string,
    title: string,
  ): Promise<WorkspaceArticleEntity | null>;

  countByFolder(workspaceId: string, folderId: string): Promise<number>;

  updateOne(
    articleId: string,
    payload: UpdateWorkspaceArticleDto,
  ): Promise<WorkspaceArticleEntity | null>;
}
