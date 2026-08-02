import { WorkspaceArticleResponseVariantService } from "./application/service";
import { IWorkspaceArticleResponseVariantRepository } from "./domain/repository.interface";
import { WorkspaceArticleResponseVariantController } from "./presentation/controller";

interface Deps {
  workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository;
}

export function createWorkspaceArticleResponseVariantModule(deps: Deps) {
  const service = new WorkspaceArticleResponseVariantService(
    deps.workspaceArticleResponseVariantRepository,
  );
  const controller = new WorkspaceArticleResponseVariantController(service);

  return {
    controller,
  };
}
