import { CreateArticleAuditLogDTO } from "../dto/create-article-audit-log.dto";
import { ArticleAuditLogEntity } from "./entity";

export interface IArticleAuditLogRepository {
  add(data: CreateArticleAuditLogDTO): Promise<ArticleAuditLogEntity>;
  findByArticleId(articleId: string): Promise<ArticleAuditLogEntity[]>;
}
