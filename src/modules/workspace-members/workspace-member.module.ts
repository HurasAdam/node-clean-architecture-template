import { IUserRepository } from "../users/domain/user.repository.interface";
import { IWorkspaceRepository } from "../workspace/domain/repository.interface";
import { WorkspaceMemberService } from "./application/workspace-member.service";
import { IWorkspaceMemberRepository } from "./domain/repository.interface";
import { WorkspaceMemberController } from "./presentation/workspace-member.controller";

interface deps {
  workspaceMemberRepository: IWorkspaceMemberRepository;
  userRepository: IUserRepository;
  workspaceRepository: IWorkspaceRepository;
}

export function createWorkspaceMemberModule(deps: deps) {
  const service = new WorkspaceMemberService(
    deps.workspaceMemberRepository,
    deps.userRepository,
    deps.workspaceRepository,
  );
  const controller = new WorkspaceMemberController(service);

  return {
    controller,
  };
}
