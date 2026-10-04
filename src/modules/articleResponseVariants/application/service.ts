import { IArticleResponseVariantRepository } from "../domain/repository.interface";

export class ArticleResponseVariantService {
  private articleResponseVariantRepository: IArticleResponseVariantRepository;

  constructor(
    articleResponseVariantRepository: IArticleResponseVariantRepository,
  ) {
    this.articleResponseVariantRepository = articleResponseVariantRepository;
  }

  add(
    currentUserId: string,
    payload: {
      articleId: string;
      variantName: string;
      variantContent: string;
      order: number;
    },
  ) {
    return this.articleResponseVariantRepository.add(currentUserId, payload);
  }

  findByArticleId(articleId: string) {}

  findOne(variantId: string) {}
  updateOne(variantId: string) {}
  deleteOne(variantId: string) {}
}
