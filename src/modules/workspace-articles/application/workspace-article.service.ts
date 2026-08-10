import { NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IWorkspaceArticleResponseVariantRepository } from "../../workspace-article-response-variants/domain/repository.interface";
import { IWorkspaceFolderRepository } from "../../workspace-folders/domain/repository.interface";
import { IWorkspaceRepository } from "../../workspace/domain/repository.interface";
import { IWorkspaceArticleRepository } from "../domain/repository.interface";

export class WorkspaceArticleService {
  private workspaceArticleRepository: IWorkspaceArticleRepository;
  private workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository;
  private workspaceFolderRepository: IWorkspaceFolderRepository;
  private workspaceRepository: IWorkspaceRepository;

  constructor(
    workspaceArticleRepository: IWorkspaceArticleRepository,
    workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository,
    workspaceFolderRepository: IWorkspaceFolderRepository,
    workspaceRepository: IWorkspaceRepository,
  ) {
    this.workspaceArticleRepository = workspaceArticleRepository;
    this.workspaceArticleResponseVariantRepository =
      workspaceArticleResponseVariantRepository;
    this.workspaceFolderRepository = workspaceFolderRepository;
    this.workspaceRepository = workspaceRepository;
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

  async findOne(userId: string, workspaceId: string, articleId: string) {
    const article = await this.workspaceArticleRepository.findOne(
      articleId,
      workspaceId,
    );
    appAssert(article, NOT_FOUND, "Workspace article not found");
    const folder = await this.workspaceFolderRepository.findOne(
      article.folderId,
    );

    appAssert(folder, NOT_FOUND, "Workspace folder not found");

    const workspace = await this.workspaceRepository.findOne(
      article.workspaceId,
    );

    appAssert(workspace, NOT_FOUND, "Workspace not found");

    const variants =
      await this.workspaceArticleResponseVariantRepository.findAllByArticleId(
        article.id,
      );

    console.log(variants);

    return {
      article,
      folder,
      workspace,
      variants,
    };
  }

  findByFolder(userId: string, workspaceId: string, folderId: string) {
    return this.workspaceArticleRepository.findByFolder(
      userId,
      workspaceId,
      folderId,
    );
  }
}
