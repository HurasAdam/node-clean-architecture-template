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
  //   updateOne: (variantId: string) => Promise<void>;
  deleteOne: (variantId: string) => Promise<void>;
}
