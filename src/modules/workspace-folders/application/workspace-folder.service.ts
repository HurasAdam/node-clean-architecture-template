import { IWorkspaceFolderRepository } from "../domain/repository.interface";
import { AddWorkspaceFolderDto } from "../dto/add";
import { UpdateWorkspaceFolderDto } from "../dto/update";

export class WorkspaceFolderService {
  private workspaceFolderRepository: IWorkspaceFolderRepository;

  constructor(workspaceFolderRepository: IWorkspaceFolderRepository) {
    this.workspaceFolderRepository = workspaceFolderRepository;
  }

  add(userId: string, payload: AddWorkspaceFolderDto) {
    return this.workspaceFolderRepository.add(userId, payload);
  }

  findAllByWorkspace(workspaceId: string) {
    return this.workspaceFolderRepository.findAllByWorkspace(workspaceId);
  }

  updateOne(folderId: string, payload: UpdateWorkspaceFolderDto) {
    return this.workspaceFolderRepository.updateOne(folderId, payload);
  }

  deleteOne(folderId: string) {
    return this.workspaceFolderRepository.deleteOne(folderId);
  }
}
