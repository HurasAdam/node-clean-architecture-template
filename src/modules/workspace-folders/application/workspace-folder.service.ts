import { IWorkspaceFolderRepository } from "../domain/repository.interface";
import { AddWorkspaceFolderDto } from "../dto/add";

export class WorkspaceFolderService {
  private workspaceFolderRepository: IWorkspaceFolderRepository;

  constructor(workspaceFolderRepository: IWorkspaceFolderRepository) {
    this.workspaceFolderRepository = workspaceFolderRepository;
  }

  add(userId: string, payload: AddWorkspaceFolderDto) {
    return this.workspaceFolderRepository.add(userId, payload);
  }
}
