import { IWorkspaceArticleResponseVariantRepository } from "../workspace-article-response-variants/domain/repository.interface";
import { IWorkspaceFolderRepository } from "../workspace-folders/domain/repository.interface";
import { IWorkspaceRepository } from "../workspace/domain/repository.interface";
import { WorkspaceArticleService } from "./application/workspace-article.service";
import { IWorkspaceArticleRepository } from "./domain/repository.interface";
import { WorkspaceArticleController } from "./presentation/workspace-article.controller";

interface Deps {
  workspaceArticleRepository: IWorkspaceArticleRepository;
  workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository;
  workspaceFolderRepository: IWorkspaceFolderRepository;
  workspaceRepository: IWorkspaceRepository;
}

export function createWorkspaceArticleModule(deps: Deps) {
  const service = new WorkspaceArticleService(
    deps.workspaceArticleRepository,
    deps.workspaceArticleResponseVariantRepository,
    deps.workspaceFolderRepository,
    deps.workspaceRepository,
  );
  const controller = new WorkspaceArticleController(service);

  return {
    controller,
  };
}
