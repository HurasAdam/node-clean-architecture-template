import { Model } from "mongoose";
import { ArticleAuditLogEntity } from "../../../domain/entity";
import { IArticleAuditLogRepository } from "../../../domain/repository.interface";
import { CreateArticleAuditLogDTO } from "../../../dto/create-article-audit-log.dto";
import { ArticleAuditLogDocument } from "../../models/mongo";

export class ArticleAuditLogRepository implements IArticleAuditLogRepository {
  private model;

  constructor(model: Model<ArticleAuditLogDocument>) {
    this.model = model;
  }

  toDomain(doc: ArticleAuditLogDocument): ArticleAuditLogEntity {
    return new ArticleAuditLogEntity(
      doc._id.toString(),
      doc.articleId.toString(),
      doc.variantId?.toString() ?? null,
      doc.eventType,
      {
        userId: doc.actor.userId.toString(),
        name: doc.actor.name,
        surname: doc.actor.surname,
        email: doc.actor.email,
      },
      doc.changes,
      doc.createdAt,
    );
  }

  async add(data: CreateArticleAuditLogDTO): Promise<ArticleAuditLogEntity> {
    const doc = await this.model.create({
      articleId: data.articleId,
      variantId: data.variantId,
      eventType: data.eventType,
      actor: {
        userId: data.actorId,
        name: data.actorName,
        surname: data.actorName,
        email: data.actorEmail,
      },
      changes: data.changes,
    });

    return this.toDomain(doc);
  }
}
