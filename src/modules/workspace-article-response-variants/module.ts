import { IWorkspaceArticleRepository } from "../workspace-articles/domain/repository.interface";
import { WorkspaceArticleResponseVariantService } from "./application/service";
import { IWorkspaceArticleResponseVariantRepository } from "./domain/repository.interface";
import { WorkspaceArticleResponseVariantController } from "./presentation/controller";

interface Deps {
  workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository;
  workspaceArticleRepository: IWorkspaceArticleRepository;
}

export function createWorkspaceArticleResponseVariantModule(deps: Deps) {
  const service = new WorkspaceArticleResponseVariantService(
    deps.workspaceArticleResponseVariantRepository,
    deps.workspaceArticleRepository,
  );
  const controller = new WorkspaceArticleResponseVariantController(service);

  return {
    controller,
  };
}
