import { CONFLICT, NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IArticleAuditLogRepository } from "../../article-audit-log/domain/repository.interface";
import { IUserRepository } from "../../users/domain/user.repository.interface";
import { IArticleResponseVariantRepository } from "../domain/repository.interface";

export class ArticleResponseVariantService {
  private articleResponseVariantRepository: IArticleResponseVariantRepository;
  private articleAuditLogRepository: IArticleAuditLogRepository;
  private userRepository: IUserRepository;
  constructor(
    articleResponseVariantRepository: IArticleResponseVariantRepository,
    articleAuditLogRepository: IArticleAuditLogRepository,
    userRepository: IUserRepository,
  ) {
    this.articleResponseVariantRepository = articleResponseVariantRepository;
    this.articleAuditLogRepository = articleAuditLogRepository;
    this.userRepository = userRepository;
  }

  async add(
    currentUserId: string,
    payload: {
      articleId: string;
      variantName: string;
      variantContent: string;
      order: number;
    },
  ) {
    const [actor, variant] = await Promise.all([
      this.userRepository.findOneById(currentUserId),
      this.articleResponseVariantRepository.add(currentUserId, payload),
    ]);

    appAssert(actor, NOT_FOUND, "User not found");
    appAssert(variant, NOT_FOUND, "Nie udało się dodać wariantu odpowiedzi");

    await this.articleAuditLogRepository.add({
      articleId: payload.articleId,
      variantId: variant.id,
      eventType: "VARIANT_CREATED",

      actorId: actor.id,
      actorName: actor.name,
      actorSurname: actor.surname,
      actorEmail: actor.email,

      changes: [
        {
          field: "variantName",
          before: null,
          after: variant.variantName,
        },
        {
          field: "variantContent",
          before: null,
          after: variant.variantContent,
        },
        {
          field: "order",
          before: null,
          after: variant.order,
        },
      ],
    });

    return variant;
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
  async deleteOne(variantId: string, currentUserId: string) {
    const [variant, actor] = await Promise.all([
      this.articleResponseVariantRepository.findOne(variantId),
      this.userRepository.findOneById(currentUserId),
    ]);

    appAssert(variant, NOT_FOUND, "Nie znaleziono wariantu odpowiedzi");
    appAssert(actor, NOT_FOUND, "User not found");

    await this.articleResponseVariantRepository.deleteOne(variantId);

    await this.articleAuditLogRepository.add({
      articleId: variant.articleId,
      variantId: variant.id,
      eventType: "VARIANT_DELETED",

      actorId: actor.id,
      actorName: actor.name,
      actorSurname: actor.surname,
      actorEmail: actor.email,

      changes: [
        {
          field: "variantName",
          before: variant.variantName,
          after: null,
        },
        {
          field: "variantContent",
          before: variant.variantContent,
          after: null,
        },
        {
          field: "order",
          before: variant.order,
          after: null,
        },
      ],
    });
  }
}
