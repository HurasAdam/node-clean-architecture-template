import { NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IWorkspaceArticleRepository } from "../../workspace-articles/domain/repository.interface";
import { IWorkspaceArticleResponseVariantRepository } from "../domain/repository.interface";

export class WorkspaceArticleResponseVariantService {
  private workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository;
  private workspaceArticleRepository: IWorkspaceArticleRepository;

  constructor(
    workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository,
    workspaceArticleRepository: IWorkspaceArticleRepository,
  ) {
    this.workspaceArticleResponseVariantRepository =
      workspaceArticleResponseVariantRepository;
    this.workspaceArticleRepository = workspaceArticleRepository;
  }

  async add(
    userId: string,
    payload: {
      workspaceArticleId: string;
      variantName: string;
      variantContent: string;
      order: number;
    },
  ) {
    const workspaceArticle = await this.workspaceArticleRepository.findById(
      payload.workspaceArticleId,
    );

    appAssert(workspaceArticle, NOT_FOUND, "Article not found");

    return this.workspaceArticleResponseVariantRepository.add(userId, payload);
  }
}
