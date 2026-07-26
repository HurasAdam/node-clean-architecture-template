import { IUserRepository } from "../../users/domain/user.repository.interface";
import {
  DEFAULT_MEMBER_PERMISSIONS,
  OWNER_PERMISSIONS,
} from "../../workspace-members/domain/permissions";
import { IWorkspaceMemberRepository } from "../../workspace-members/domain/repository.interface";
import { IWorkspaceRepository } from "../domain/repository.interface";
import { AddWorkspaceDto } from "../dto/add";

export class WorkspaceService {
  private workspaceRepository: IWorkspaceRepository;
  private workspaceMemberRepository: IWorkspaceMemberRepository;
  private userRepository: IUserRepository;

  constructor(
    workspaceRepository: IWorkspaceRepository,
    workspaceMemberRepository: IWorkspaceMemberRepository,
    userRepository: IUserRepository,
  ) {
    this.workspaceRepository = workspaceRepository;
    this.workspaceMemberRepository = workspaceMemberRepository;
    this.userRepository = userRepository;
  }

  async add(userId: string, payload: AddWorkspaceDto) {
    const workspace = await this.workspaceRepository.add(userId, payload);

    const users = await this.userRepository.find();

    const members = users.map((user) => ({
      workspaceId: workspace.id,
      userId: user.id,
      permissions:
        user.id === userId ? OWNER_PERMISSIONS : DEFAULT_MEMBER_PERMISSIONS,
    }));

    await this.workspaceMemberRepository.addMany(members);

    return workspace;
  }

  find() {
    return this.workspaceRepository.find();
  }

  findOne(workspaceId: string) {
    return this.workspaceRepository.findOne(workspaceId);
  }
}
