/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { WorkspaceService } from "./application/workspace.service";
import { IWorkspaceRepository } from "./domain/repository.interface";
import { WorkspaceController } from "./presentation/workspace.controller";

interface deps {
  workspaceRepository: IWorkspaceRepository;
}

export function createWorkspaceModule(deps: deps) {
  const service = new WorkspaceService(deps.workspaceRepository);
  const controller = new WorkspaceController(service);

  return {
    controller,
  };
}
