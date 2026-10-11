import { ArticleResponseVariantEntity } from "./entity";

export interface IArticleResponseVariantRepository {
  add: (
    currentUserId: string,
    payload: {
      articleId: string;
      variantName: string;
      variantContent: string;
    },
  ) => Promise<ArticleResponseVariantEntity>;

  findOne: (variantId: string) => Promise<ArticleResponseVariantEntity | null>;

  findByArticleId: (
    articleId: string,
  ) => Promise<ArticleResponseVariantEntity[]>;

  findByArticleIdAndVariantName: (
    articleId: string,
    variantName: string,
    excludeVariantId?: string,
  ) => Promise<ArticleResponseVariantEntity | null>;

  updateOne: (
    variantId: string,
    payload: {
      variantName?: string;
      variantContent?: string;
    },
  ) => Promise<ArticleResponseVariantEntity | null>;
  deleteOne: (variantId: string) => Promise<void>;
}
