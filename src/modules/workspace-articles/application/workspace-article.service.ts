import { BAD_REQUEST, NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IUserRepository } from "../../users/domain/user.repository.interface";
import { IWorkspaceArticleResponseVariantRepository } from "../../workspace-article-response-variants/domain/repository.interface";
import { IWorkspaceFolderRepository } from "../../workspace-folders/domain/repository.interface";
import { IWorkspaceRepository } from "../../workspace/domain/repository.interface";
import { IWorkspaceArticleRepository } from "../domain/repository.interface";
import { UpdateWorkspaceArticleDto } from "../dto/update";

export class WorkspaceArticleService {
  private workspaceArticleRepository: IWorkspaceArticleRepository;
  private workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository;
  private workspaceFolderRepository: IWorkspaceFolderRepository;
  private workspaceRepository: IWorkspaceRepository;
  private userRepository: IUserRepository;

  constructor(
    workspaceArticleRepository: IWorkspaceArticleRepository,
    workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository,
    workspaceFolderRepository: IWorkspaceFolderRepository,
    workspaceRepository: IWorkspaceRepository,
    userRepository: IUserRepository,
  ) {
    this.workspaceArticleRepository = workspaceArticleRepository;
    this.workspaceArticleResponseVariantRepository =
      workspaceArticleResponseVariantRepository;
    this.workspaceFolderRepository = workspaceFolderRepository;
    this.workspaceRepository = workspaceRepository;
    this.userRepository = userRepository;
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

    const author = await this.userRepository.findOneById(article.createdBy);

    return {
      article,
      folder,
      workspace,
      variants,
      author,
    };
  }

  async findByFolder(userId: string, workspaceId: string, folderId: string) {
    const folder = await this.workspaceFolderRepository.findOne(folderId);

    appAssert(folder, NOT_FOUND, "Folder not found");

    const articles = await this.workspaceArticleRepository.findByFolder(
      userId,
      workspaceId,
      folderId,
    );

    const userIds = [...new Set(articles.map((article) => article.createdBy))];

    const users = await this.userRepository.findByIds(userIds);

    const usersMap = new Map(users.map((user) => [user.id, user]));

    const mappedArticles = articles.map((article) => {
      const author = usersMap.get(article.createdBy);

      return {
        ...article,
        createdBy: author
          ? {
              id: author.id,
              name: author.name,
              surname: author.surname,
            }
          : null,
      };
    });

    return {
      folder,
      articles: mappedArticles,
    };
  }

  async updateOne(
    workspaceId: string,
    articleId: string,
    payload: UpdateWorkspaceArticleDto,
  ) {
    const article = await this.workspaceArticleRepository.findOne(
      articleId,
      workspaceId,
    );

    appAssert(article, NOT_FOUND, "Workspace article not found");

    if (payload.folderId) {
      const folder = await this.workspaceFolderRepository.findOne(
        payload.folderId,
      );

      appAssert(folder, NOT_FOUND, "Workspace folder not found");

      appAssert(
        folder.workspaceId === workspaceId,
        BAD_REQUEST,
        "Folder does not belong to this workspace",
      );
    }

    return this.workspaceArticleRepository.updateOne(articleId, payload);
  }
}
