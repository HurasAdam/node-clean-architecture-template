import { WorkspaceArticleResponseVariantEntity } from "./entity";

export interface IWorkspaceArticleResponseVariantRepository {
  add(
    userId: string,
    payload: {
      workspaceArticleId: string;
      variantName: string;
      variantContent: string;
      order: number;
    },
  ): Promise<WorkspaceArticleResponseVariantEntity>;

  findAllByArticleId: (
    workspaceArticleId: string,
  ) => Promise<WorkspaceArticleResponseVariantEntity[]>;

  findById: (
    responseVariantId: string,
  ) => Promise<WorkspaceArticleResponseVariantEntity | null>;

  updateOne: (
    responseVariantId: string,
    payload: {},
    userId: string,
  ) => Promise<WorkspaceArticleResponseVariantEntity | null>;

  findByArticleIdAndVariantName(
    workspaceArticleId: string,
    responseVariantName: string,
    excludeResponseVariantId?: string,
  ): Promise<WorkspaceArticleResponseVariantEntity | null>;

  deleteOne: (
    responseVariantId: string,
  ) => Promise<WorkspaceArticleResponseVariantEntity | null>;
}
