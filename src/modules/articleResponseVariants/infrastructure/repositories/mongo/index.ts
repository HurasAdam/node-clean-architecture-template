import { Model } from "mongoose";
import { ArticleResponseVariantEntity } from "../../../domain/entity";
import { IArticleResponseVariantRepository } from "../../../domain/repository.interface";
import { ArticleResponseVariantDocument } from "../../models/mongo";

export class ArticleResponseVariantRepository implements IArticleResponseVariantRepository {
  private model;
  constructor(model: Model<ArticleResponseVariantDocument>) {
    this.model = model;
  }

  toDomain(doc: ArticleResponseVariantDocument) {
    return new ArticleResponseVariantEntity(
      doc._id.toString(),
      doc.articleId.toString(),
      doc.variantName,
      doc.variantContent,
      doc.order,
      doc.createdBy.toString(),
      doc.createdAt,
    );
  }

  async add(
    currentUser: string,

    payload: {
      articleId: string;
      variantName: string;
      variantContent: string;
    },
  ) {
    const lastVariant = await this.model
      .findOne({ articleId: payload.articleId })
      .sort({ order: -1 });

    const order = lastVariant ? lastVariant.order + 1 : 0;

    const doc = await this.model.create({
      articleId: payload.articleId,
      variantName: payload.variantName,
      variantContent: payload.variantContent,
      order,
      createdBy: currentUser,
    });

    return this.toDomain(doc);
  }

  async findByArticleId(
    articleId: string,
  ): Promise<ArticleResponseVariantEntity[]> {
    const docs = await this.model.find({ articleId });

    return docs.map((doc) => this.toDomain(doc));
  }
}
