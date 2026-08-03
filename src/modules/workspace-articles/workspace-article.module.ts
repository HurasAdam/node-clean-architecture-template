import { IWorkspaceArticleResponseVariantRepository } from "../workspace-article-response-variants/domain/repository.interface";
import { WorkspaceArticleService } from "./application/workspace-article.service";
import { IWorkspaceArticleRepository } from "./domain/repository.interface";
import { WorkspaceArticleController } from "./presentation/workspace-article.controller";

interface Deps {
  workspaceArticleRepository: IWorkspaceArticleRepository;
  workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository;
}

export function createWorkspaceArticleModule(deps: Deps) {
  const service = new WorkspaceArticleService(
    deps.workspaceArticleRepository,
    deps.workspaceArticleResponseVariantRepository,
  );
  const controller = new WorkspaceArticleController(service);

  return {
    controller,
  };
}
