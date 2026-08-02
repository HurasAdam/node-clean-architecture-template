import { IWorkspaceArticleResponseVariantRepository } from "../domain/repository.interface";

export class WorkspaceArticleResponseVariantService {
  private workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository;

  constructor(
    workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository,
  ) {
    this.workspaceArticleResponseVariantRepository =
      workspaceArticleResponseVariantRepository;
  }
}
