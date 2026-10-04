export class ArticleResponseVariantEntity {
  constructor(
    public id: string,
    public articleId: string,
    public variantName: string,
    public variantContent: string,
    public order: number,
    public createdBy: string,
    public createdAt: Date,
  ) {}
}
