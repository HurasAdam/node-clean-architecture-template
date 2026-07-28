import { FORBIDDEN, NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IUserRepository } from "../../users/domain/user.repository.interface";
import {
  DEFAULT_MEMBER_PERMISSIONS,
  OWNER_PERMISSIONS,
} from "../../workspace-members/domain/permissions";
import { IWorkspaceMemberRepository } from "../../workspace-members/domain/repository.interface";
import { IWorkspaceRepository } from "../domain/repository.interface";
import { AddWorkspaceDto } from "../dto/add";
import { UpdateWorkspaceDto } from "../dto/update";

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

  async findOne(workspaceId: string, userId: string) {
    const workspace = await this.workspaceRepository.findOne(workspaceId);
    appAssert(workspace, NOT_FOUND, "Workspace not found");
    const isOwner = workspace.isOwner(userId);

    return {
      id: workspace.id,
      name: workspace.name,
      description: workspace.description,
      labelColor: workspace.labelColor,
      iconKey: workspace.iconKey,
      ...(isOwner && {
        inviteCode: workspace.inviteCode,
      }),
    };
  }

  async updateOne(
    workspaceId: string,
    userId: string,
    payload: UpdateWorkspaceDto,
  ) {
    const workspace = await this.workspaceRepository.findOne(workspaceId);
    appAssert(workspace, NOT_FOUND, "Workspace not found");

    const isOwner = workspace.isOwner(userId);
    appAssert(
      isOwner,
      FORBIDDEN,
      "You do not have permission to perform this action",
    );
    await this.workspaceRepository.updateOne(workspaceId, payload);
  }
}
