import { IWorkspaceArticleRepository } from "../workspace-articles/domain/repository.interface";
import { WorkspaceFolderService } from "./application/workspace-folder.service";
import { IWorkspaceFolderRepository } from "./domain/repository.interface";
import { WorkspaceFolderController } from "./presentation/workspace-folder.controller";

interface Deps {
  workspaceFolderRepository: IWorkspaceFolderRepository;
  workspaceArticleRepository: IWorkspaceArticleRepository;
}

export function createWorkspaceFolderModule(deps: Deps) {
  const service = new WorkspaceFolderService(
    deps.workspaceFolderRepository,
    deps.workspaceArticleRepository,
  );
  const controller = new WorkspaceFolderController(service);

  return {
    controller,
  };
}
