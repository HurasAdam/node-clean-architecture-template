import { IWorkspaceArticleRepository } from "../workspace-articles/domain/repository.interface";
import { IWorkspaceMemberRepository } from "../workspace-members/domain/repository.interface";
import { IWorkspaceRepository } from "../workspace/domain/repository.interface";
import { WorkspaceFolderService } from "./application/workspace-folder.service";
import { IWorkspaceFolderRepository } from "./domain/repository.interface";
import { WorkspaceFolderController } from "./presentation/workspace-folder.controller";

interface Deps {
  workspaceRepository: IWorkspaceRepository;
  workspaceFolderRepository: IWorkspaceFolderRepository;
  workspaceArticleRepository: IWorkspaceArticleRepository;
  workspaceMemberRepository: IWorkspaceMemberRepository;
}

export function createWorkspaceFolderModule(deps: Deps) {
  const service = new WorkspaceFolderService(
    deps.workspaceRepository,
    deps.workspaceFolderRepository,
    deps.workspaceArticleRepository,
    deps.workspaceMemberRepository,
  );
  const controller = new WorkspaceFolderController(service);

  return {
    controller,
  };
}
