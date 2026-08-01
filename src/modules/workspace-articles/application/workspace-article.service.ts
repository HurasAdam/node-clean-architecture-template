import { IWorkspaceArticleRepository } from "../domain/repository.interface";

export class WorkspaceArticleService {
  private workspaceArticleRepository: IWorkspaceArticleRepository;

  constructor(workspaceArticleRepository: IWorkspaceArticleRepository) {
    this.workspaceArticleRepository = workspaceArticleRepository;
  }

  add(userId: string, payload: {}) {
    return this.workspaceArticleRepository.add(userId, payload);
  }
}
