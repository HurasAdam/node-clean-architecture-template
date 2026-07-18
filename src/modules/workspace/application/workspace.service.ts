import { IWorkspaceRepository } from "../domain/repository.interface";

export class WorkspaceService {
  private workspaceRepository: IWorkspaceRepository;

  constructor(workspaceRepository: IWorkspaceRepository) {
    this.workspaceRepository = workspaceRepository;
  }
}
