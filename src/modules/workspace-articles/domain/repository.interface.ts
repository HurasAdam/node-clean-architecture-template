import { WorkspaceArticleEntity } from "./workspace-folder.entity";

export interface IWorkspaceArticleRepository {
  add(userId: string, payload: {}): Promise<WorkspaceArticleEntity>;
}
