import { IWorkspaceRepository } from "../domain/repository.interface";
import { AddWorkspaceDto } from "../dto/add";

export class WorkspaceService {
  private workspaceRepository: IWorkspaceRepository;

  constructor(workspaceRepository: IWorkspaceRepository) {
    this.workspaceRepository = workspaceRepository;
  }

  add(userId: string, payload: AddWorkspaceDto) {
    return this.workspaceRepository.add(userId, payload);
  }

  find() {
    return this.workspaceRepository.find();
  }
}
