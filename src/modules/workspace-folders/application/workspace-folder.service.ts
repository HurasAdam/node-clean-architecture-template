import { CONFLICT, FORBIDDEN, NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IWorkspaceArticleRepository } from "../../workspace-articles/domain/repository.interface";
import { IWorkspaceMemberRepository } from "../../workspace-members/domain/repository.interface";
import { IWorkspaceRepository } from "../../workspace/domain/repository.interface";
import { IWorkspaceFolderRepository } from "../domain/repository.interface";
import { AddWorkspaceFolderDto } from "../dto/add";
import { UpdateWorkspaceFolderDto } from "../dto/update";

export class WorkspaceFolderService {
  private workspaceRepository: IWorkspaceRepository;
  private workspaceFolderRepository: IWorkspaceFolderRepository;
  private workspaceArticleRepository: IWorkspaceArticleRepository;
  private workspaceMemberRepository: IWorkspaceMemberRepository;

  constructor(
    workspaceRepository: IWorkspaceRepository,
    workspaceFolderRepository: IWorkspaceFolderRepository,
    workspaceArticleRepository: IWorkspaceArticleRepository,
    workspaceMemberRepository: IWorkspaceMemberRepository,
  ) {
    this.workspaceRepository = workspaceRepository;
    this.workspaceFolderRepository = workspaceFolderRepository;
    this.workspaceArticleRepository = workspaceArticleRepository;
    this.workspaceMemberRepository = workspaceMemberRepository;
  }

  async add(userId: string, payload: AddWorkspaceFolderDto) {
    console.log("W:", payload.workspaceId);
    const workspace = await this.workspaceRepository.findOne(
      payload.workspaceId,
    );

    appAssert(workspace, NOT_FOUND, "Workspace not found");

    const member = await this.workspaceMemberRepository.findByUserAndWorkspace(
      userId,
      payload.workspaceId,
    );

    appAssert(member, FORBIDDEN, "You don't have access to this workspace");

    const isOwner = workspace.owner === userId;

    appAssert(
      isOwner || member.permissions.addFolder,
      FORBIDDEN,
      "You don't have permission to add folders",
    );

    const existingFolder =
      await this.workspaceFolderRepository.findOneByNameAndWorkspace(
        payload.workspaceId,
        payload.name,
      );

    appAssert(
      !existingFolder,
      CONFLICT,
      "Folder with this name already exists in this workspace",
    );
    return this.workspaceFolderRepository.add(userId, payload);
  }

  async findAllByWorkspace(workspaceId: string) {
    const folders =
      await this.workspaceFolderRepository.findAllByWorkspace(workspaceId);

    const result = await Promise.all(
      folders.map(async (folder) => {
        const articleCount =
          await this.workspaceArticleRepository.countByFolder(
            workspaceId,
            folder.id,
          );

        return {
          ...folder,
          articleCount,
        };
      }),
    );

    return result;
  }

  updateOne(folderId: string, payload: UpdateWorkspaceFolderDto) {
    return this.workspaceFolderRepository.updateOne(folderId, payload);
  }

  deleteOne(folderId: string) {
    return this.workspaceFolderRepository.deleteOne(folderId);
  }
}
