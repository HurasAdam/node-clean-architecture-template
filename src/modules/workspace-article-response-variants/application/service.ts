import { CONFLICT, FORBIDDEN, NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IWorkspaceArticleRepository } from "../../workspace-articles/domain/repository.interface";
import { IWorkspaceMemberRepository } from "../../workspace-members/domain/repository.interface";
import { IWorkspaceRepository } from "../../workspace/domain/repository.interface";
import { IWorkspaceArticleResponseVariantRepository } from "../domain/repository.interface";

export class WorkspaceArticleResponseVariantService {
  private workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository;
  private workspaceArticleRepository: IWorkspaceArticleRepository;
  private workspaceRepository: IWorkspaceRepository;
  private workspaceMemberRepository: IWorkspaceMemberRepository;

  constructor(
    workspaceArticleResponseVariantRepository: IWorkspaceArticleResponseVariantRepository,
    workspaceArticleRepository: IWorkspaceArticleRepository,
    workspaceRepository: IWorkspaceRepository,
    workspaceMemberRepository: IWorkspaceMemberRepository,
  ) {
    this.workspaceArticleResponseVariantRepository =
      workspaceArticleResponseVariantRepository;
    this.workspaceArticleRepository = workspaceArticleRepository;
    this.workspaceRepository = workspaceRepository;
    this.workspaceMemberRepository = workspaceMemberRepository;
  }

  async add(
    currentUserId: string,
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

    const workspace = await this.workspaceRepository.findOne(
      workspaceArticle.workspaceId,
    );
    appAssert(workspace, NOT_FOUND, "Workspace not found");

    const member = await this.workspaceMemberRepository.findByUserAndWorkspace(
      currentUserId,
      workspace.id,
    );
    const isOwner = workspace.isOwner(currentUserId);
    appAssert(member, FORBIDDEN, "You don't have access to this workspace");
    appAssert(
      isOwner || member.permissions.editArticle,
      FORBIDDEN,
      "You dont have permissions to perform this action",
    );

    return this.workspaceArticleResponseVariantRepository.add(
      currentUserId,
      payload,
    );
  }

  async updateOne(
    userId: string,
    responseVariantId: string,
    payload: { variantName: string; variantContent: string },
  ) {
    const responseVariant =
      await this.workspaceArticleResponseVariantRepository.findById(
        responseVariantId,
      );

    appAssert(responseVariant, NOT_FOUND, "Response variant not found");

    const existingVariant =
      await this.workspaceArticleResponseVariantRepository.findByArticleIdAndVariantName(
        responseVariant.articleId,
        payload.variantName,
        responseVariantId,
      );

    appAssert(
      !existingVariant,
      CONFLICT,
      "A response variant with this name already exists",
    );

    return this.workspaceArticleResponseVariantRepository.updateOne(
      responseVariantId,
      payload,
      userId,
    );
  }

  async deleteOne(responseVariantId: string) {
    const responseVariant =
      await this.workspaceArticleResponseVariantRepository.findById(
        responseVariantId,
      );

    appAssert(responseVariant, NOT_FOUND, "Response variant not found");

    const variantsCount =
      await this.workspaceArticleResponseVariantRepository.findAllByArticleId(
        responseVariant.articleId,
      );

    appAssert(
      variantsCount.length > 1,
      CONFLICT,
      "Article must have at least one response variant",
    );

    return this.workspaceArticleResponseVariantRepository.deleteOne(
      responseVariantId,
    );
  }
}
