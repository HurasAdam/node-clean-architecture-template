import { WorkspaceFolderService } from "./application/workspace-folder.service";
import { IWorkspaceFolderRepository } from "./domain/repository.interface";
import { WorkspaceFolderController } from "./presentation/workspace-folder.controller";

interface Deps {
  workspaceFolderRepository: IWorkspaceFolderRepository;
}

export function createWorkspaceFolderModule(deps: Deps) {
  const service = new WorkspaceFolderService(deps.workspaceFolderRepository);
  const controller = new WorkspaceFolderController(service);

  return {
    controller,
  };
}
