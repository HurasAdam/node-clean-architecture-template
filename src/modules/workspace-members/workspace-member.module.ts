import { WorkspaceMemberService } from "./application/workspace-member.service";
import { IWorkspaceMemberRepository } from "./domain/repository.interface";
import { WorkspaceMemberController } from "./presentation/workspace-member.controller";

interface deps {
  workspaceMemberRepository: IWorkspaceMemberRepository;
}

export function createWorkspaceMemberModule(deps: deps) {
  const service = new WorkspaceMemberService(deps.workspaceMemberRepository);
  const controller = new WorkspaceMemberController(service);

  return {
    controller,
  };
}
