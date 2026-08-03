export class WorkspaceArticleResponseVariantEntity {
  constructor(
    public id: string,
    public articleId: string,
    public variantName: string,
    public variantContent: string,
    public order: number,
    public createdBy: string,
    public updatedBy: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
