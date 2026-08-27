import { IWorkspaceArticleRepository } from "../../workspace-articles/domain/repository.interface";
import { IWorkspaceFolderRepository } from "../domain/repository.interface";
import { AddWorkspaceFolderDto } from "../dto/add";
import { UpdateWorkspaceFolderDto } from "../dto/update";

export class WorkspaceFolderService {
  private workspaceFolderRepository: IWorkspaceFolderRepository;
  private workspaceArticleRepository: IWorkspaceArticleRepository;

  constructor(
    workspaceFolderRepository: IWorkspaceFolderRepository,
    workspaceArticleRepository: IWorkspaceArticleRepository,
  ) {
    this.workspaceFolderRepository = workspaceFolderRepository;
    this.workspaceArticleRepository = workspaceArticleRepository;
  }

  add(userId: string, payload: AddWorkspaceFolderDto) {
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

        console.log("folder:", folder.id, "articleCount:", articleCount);

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
