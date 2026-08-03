import { IWorkspaceArticleResponseVariantRepository } from "../../workspace-article-response-variants/domain/repository.interface";
import { IWorkspaceArticleRepository } from "../domain/repository.interface";

export class WorkspaceArticleService {
  private workspaceArticleRepository: IWorkspaceArticleRepository;
  private workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository;

  constructor(
    workspaceArticleRepository: IWorkspaceArticleRepository,
    workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository,
  ) {
    this.workspaceArticleRepository = workspaceArticleRepository;
    this.workspaceArticleResponseVariantRepository =
      workspaceArticleResponseVariantRepository;
  }

  async add(
    userId: string,
    payload: {
      title: string;
      folderId: string;
      marker: string;
      responseVariant: { variantName: string; variantContent: string };
      workspaceId: string;
    },
  ) {
    const article = await this.workspaceArticleRepository.add(userId, payload);

    await this.workspaceArticleResponseVariantRepository.add(userId, {
      workspaceArticleId: article.id,
      variantName: payload.responseVariant.variantName,
      variantContent: payload.responseVariant.variantContent,
      order: 0,
    });

    return article;
  }
}
