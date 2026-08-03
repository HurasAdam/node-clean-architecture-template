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
}
