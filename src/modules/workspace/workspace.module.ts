/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { IUserRepository } from "../users/domain/user.repository.interface";
import { IWorkspaceMemberRepository } from "../workspace-members/domain/repository.interface";
import { WorkspaceService } from "./application/workspace.service";
import { IWorkspaceRepository } from "./domain/repository.interface";
import { WorkspaceController } from "./presentation/workspace.controller";

interface deps {
  workspaceRepository: IWorkspaceRepository;
  workspaceMemberRepository: IWorkspaceMemberRepository;
  userRepository: IUserRepository;
}

export function createWorkspaceModule(deps: deps) {
  const service = new WorkspaceService(
    deps.workspaceRepository,
    deps.workspaceMemberRepository,
    deps.userRepository,
  );
  const controller = new WorkspaceController(service);

  return {
    controller,
  };
}
