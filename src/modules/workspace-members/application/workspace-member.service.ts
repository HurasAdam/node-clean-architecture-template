import { BAD_REQUEST, FORBIDDEN, NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IUserRepository } from "../../users/domain/user.repository.interface";
import { IWorkspaceRepository } from "../../workspace/domain/repository.interface";
import { IWorkspaceMemberRepository } from "../domain/repository.interface";
import {
  defaultPermissions,
  ownerPermissions,
  WorkspacePermissions,
} from "../infrastructure/models/mongo";

export class WorkspaceMemberService {
  private workspaceMemberRepository: IWorkspaceMemberRepository;
  private userRepository: IUserRepository;
  private workspaceRepository: IWorkspaceRepository;
  constructor(
    workspaceMemberRepository: IWorkspaceMemberRepository,
    userRepository: IUserRepository,
    workspaceRepository: IWorkspaceRepository,
  ) {
    this.workspaceMemberRepository = workspaceMemberRepository;
    this.userRepository = userRepository;
    this.workspaceRepository = workspaceRepository;
  }

  addMany(
    payload: {
      workspaceId: string;
      userId: string;
      permissions: WorkspacePermissions;
    }[],
  ) {
    return this.workspaceMemberRepository.addMany(payload);
  }

  async findByWorkspaceId(workspaceId: string) {
    const [workspace, members] = await Promise.all([
      this.workspaceRepository.findOne(workspaceId),
      this.workspaceMemberRepository.findByWorkspaceId(workspaceId),
    ]);

    appAssert(workspace, NOT_FOUND, "Workspace not found");

    const ownerId = workspace.owner.toString();

    const userIds = members.map((member) => member.userId);

    const users = await this.userRepository.findByIds(userIds);

    return members.map((member) => {
      const user = users.find((user) => user.id === member.userId);

      return {
        memberId: member.id,
        userId: user?.id ?? null,
        name: user?.name ?? null,
        surname: user?.surname ?? null,
        email: user?.email ?? null,
        isOwner: member.userId === ownerId,
        permissions: member.permissions,
      };
    });
  }

  async transferOwnership(
    workspaceId: string,
    currentUserId: string,
    newOwnerId: string,
  ) {
    const workspace = await this.workspaceRepository.findOne(workspaceId);
    appAssert(workspace, NOT_FOUND, "Workspace not found");

    appAssert(
      workspace.isOwner(currentUserId),
      FORBIDDEN,
      "You don't have permissions to perform this action",
    );

    appAssert(
      currentUserId !== newOwnerId,
      BAD_REQUEST,
      "The new owner must be different from the current owner",
    );

    const newOwner =
      await this.workspaceMemberRepository.findByUserAndWorkspace(
        newOwnerId,
        workspaceId,
      );

    appAssert(
      newOwner,
      NOT_FOUND,
      "New owner is not a member of this workspace",
    );

    await this.workspaceMemberRepository.updatePermissions(
      newOwnerId,
      ownerPermissions,
    );

    await this.workspaceMemberRepository.updatePermissions(
      currentUserId,
      defaultPermissions,
    );

    await this.workspaceRepository.updateOwner(workspaceId, newOwnerId);
  }

  async deleteOne(
    workspaceId: string,
    currentUserId: string,
    memberId: string,
  ) {
    const workspace = await this.workspaceRepository.findOne(workspaceId);
    appAssert(workspace, NOT_FOUND, "Workspace not found");

    const currentMember =
      await this.workspaceMemberRepository.findByUserAndWorkspace(
        currentUserId,
        workspaceId,
      );

    appAssert(
      currentMember,
      FORBIDDEN,
      "You do not have access to this workspace",
    );

    appAssert(
      currentMember.permissions.removeMember,
      FORBIDDEN,
      "You do not have permission to remove workspace members",
    );

    const member =
      await this.workspaceMemberRepository.findByMemberIdAndWorkspace(
        memberId,
        workspaceId,
      );

    appAssert(member, NOT_FOUND, "Workspace member not found");

    appAssert(
      !workspace.isOwner(member.userId),
      FORBIDDEN,
      "The workspace owner cannot be removed",
    );

    await this.workspaceMemberRepository.deleteOne(memberId);
  }
}
