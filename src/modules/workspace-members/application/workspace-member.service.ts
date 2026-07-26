import { NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IUserRepository } from "../../users/domain/user.repository.interface";
import { IWorkspaceRepository } from "../../workspace/domain/repository.interface";
import { IWorkspaceMemberRepository } from "../domain/repository.interface";
import { WorkspacePermissions } from "../infrastructure/models/mongo";

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
}
