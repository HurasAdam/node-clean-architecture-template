export class WorkspaceFolderService {
  private workspaceFolderRepository;

  constructor(workspaceFolderRepository) {
    this.workspaceFolderRepository = workspaceFolderRepository;
  }

  add(userId: string, payload: unknown) {
    return this.workspaceFolderRepository.add(userId, payload);
  }
}
