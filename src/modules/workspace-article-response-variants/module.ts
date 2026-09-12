import { IWorkspaceArticleRepository } from "../workspace-articles/domain/repository.interface";
import { IWorkspaceMemberRepository } from "../workspace-members/domain/repository.interface";
import { IWorkspaceRepository } from "../workspace/domain/repository.interface";
import { WorkspaceArticleResponseVariantService } from "./application/service";
import { IWorkspaceArticleResponseVariantRepository } from "./domain/repository.interface";
import { WorkspaceArticleResponseVariantController } from "./presentation/controller";

interface Deps {
  workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository;
  workspaceArticleRepository: IWorkspaceArticleRepository;
  workspaceRepository: IWorkspaceRepository;
  workspaceMemberRepository: IWorkspaceMemberRepository;
}

export function createWorkspaceArticleResponseVariantModule(deps: Deps) {
  const service = new WorkspaceArticleResponseVariantService(
    deps.workspaceArticleResponseVariantRepository,
    deps.workspaceArticleRepository,
    deps.workspaceRepository,
    deps.workspaceMemberRepository,
  );
  const controller = new WorkspaceArticleResponseVariantController(service);

  return {
    controller,
  };
}
