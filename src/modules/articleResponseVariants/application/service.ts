import { CONFLICT, NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
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
  async updateOne(
    variantId: string,
    payload: {
      variantName?: string;
      variantContent?: string;
    },
  ) {
    const variant =
      await this.articleResponseVariantRepository.findOne(variantId);

    appAssert(variant, NOT_FOUND, "Nie znaleziono wariantu odpowiedzi");

    if (payload.variantName) {
      const existingVariant =
        await this.articleResponseVariantRepository.findByArticleIdAndVariantName(
          variant.articleId,
          payload.variantName,
          variantId,
        );

      appAssert(
        !existingVariant,
        CONFLICT,
        "A response variant with this name already exists in this article.",
      );
    }

    return this.articleResponseVariantRepository.updateOne(variantId, payload);
  }
  async deleteOne(variantId: string) {
    const variant =
      await this.articleResponseVariantRepository.findOne(variantId);

    await this.articleResponseVariantRepository.deleteOne(variantId);
  }
}
