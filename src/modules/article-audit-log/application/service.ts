import { IArticleAuditLogRepository } from "../domain/repository.interface";

export class ArticleAuditLogService {
  private articleAuditLogRepository: IArticleAuditLogRepository;

  constructor(articleAuditLogRepository: IArticleAuditLogRepository) {
    this.articleAuditLogRepository = articleAuditLogRepository;
  }
}
