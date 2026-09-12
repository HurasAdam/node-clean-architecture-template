import { CONFLICT, FORBIDDEN, NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IUserRepository } from "../../users/domain/user.repository.interface";
import { IWorkspaceArticleResponseVariantRepository } from "../../workspace-article-response-variants/domain/repository.interface";
import { IWorkspaceFolderRepository } from "../../workspace-folders/domain/repository.interface";
import { IWorkspaceMemberRepository } from "../../workspace-members/domain/repository.interface";
import { IWorkspaceRepository } from "../../workspace/domain/repository.interface";
import { IWorkspaceArticleRepository } from "../domain/repository.interface";
import { UpdateWorkspaceArticleDto } from "../dto/update";

export class WorkspaceArticleService {
  private workspaceArticleRepository: IWorkspaceArticleRepository;
  private workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository;
  private workspaceFolderRepository: IWorkspaceFolderRepository;
  private workspaceRepository: IWorkspaceRepository;
  private workspaceMemberRepository: IWorkspaceMemberRepository;
  private userRepository: IUserRepository;

  constructor(
    workspaceArticleRepository: IWorkspaceArticleRepository,
    workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository,
    workspaceFolderRepository: IWorkspaceFolderRepository,
    workspaceRepository: IWorkspaceRepository,
    workspaceMemberRepository: IWorkspaceMemberRepository,
    userRepository: IUserRepository,
  ) {
    this.workspaceArticleRepository = workspaceArticleRepository;
    this.workspaceArticleResponseVariantRepository =
      workspaceArticleResponseVariantRepository;
    this.workspaceFolderRepository = workspaceFolderRepository;
    this.workspaceRepository = workspaceRepository;
    this.workspaceMemberRepository = workspaceMemberRepository;
    this.userRepository = userRepository;
  }

  async add(
    currentUserId: string,
    payload: {
      title: string;
      folderId: string;
      marker: string;
      responseVariant: { variantName: string; variantContent: string };
      workspaceId: string;
    },
  ) {
    const workspace = await this.workspaceRepository.findOne(
      payload.workspaceId,
    );

    appAssert(workspace, NOT_FOUND, "Workspace not found");

    const member = await this.workspaceMemberRepository.findByUserAndWorkspace(
      currentUserId,
      payload.workspaceId,
    );

    appAssert(member, FORBIDDEN, "You don't have access to this workspace");

    const isOwner = workspace.isOwner(currentUserId);

    appAssert(
      isOwner || member.permissions.addArticle,
      FORBIDDEN,
      "You don't have permission to add articles",
    );

    const folder = await this.workspaceFolderRepository.findOne(
      payload.folderId,
    );

    appAssert(folder, NOT_FOUND, "Folder not found");

    appAssert(
      folder.workspaceId === payload.workspaceId,
      NOT_FOUND,
      "Folder not found",
    );

    const existingArticle =
      await this.workspaceArticleRepository.findOneByTitleAndFolder(
        payload.folderId,
        payload.title,
      );

    appAssert(
      !existingArticle,
      CONFLICT,
      "Article with this title already exists in this folder",
    );

    const article = await this.workspaceArticleRepository.add(
      currentUserId,
      payload,
    );

    await this.workspaceArticleResponseVariantRepository.add(currentUserId, {
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
    currentUserId: string,
    workspaceId: string,
    articleId: string,
    payload: UpdateWorkspaceArticleDto,
  ) {
    const workspace = await this.workspaceRepository.findOne(workspaceId);

    appAssert(workspace, NOT_FOUND, "Workspace not found");

    const article = await this.workspaceArticleRepository.findOne(
      articleId,
      workspaceId,
    );

    appAssert(article, NOT_FOUND, "Workspace article not found");

    const member = await this.workspaceMemberRepository.findByUserAndWorkspace(
      currentUserId,
      workspaceId,
    );

    appAssert(member, FORBIDDEN, "You don't have access to this workspace");

    const isOwner = workspace.isOwner(currentUserId);

    appAssert(
      isOwner || member.permissions.editArticle,
      FORBIDDEN,
      "You don't have permission to edit articles",
    );

    if (payload.folderId) {
      const folder = await this.workspaceFolderRepository.findOne(
        payload.folderId,
      );

      appAssert(folder, NOT_FOUND, "Workspace folder not found");

      appAssert(
        folder.workspaceId === workspaceId,
        NOT_FOUND,
        "Workspace folder not found",
      );
    }

    if (payload.title) {
      const folderId = payload.folderId ?? article.folderId;

      const existingArticle =
        await this.workspaceArticleRepository.findOneByTitleAndFolderExcept(
          folderId,
          payload.title,
          articleId,
        );

      appAssert(
        !existingArticle,
        CONFLICT,
        "Article with this title already exists in this folder",
      );
    }

    return this.workspaceArticleRepository.updateOne(articleId, payload);
  }
}
