import { IArticleAuditLogRepository } from "../domain/repository.interface";

export class ArticleAuditLogService {
  private articleAuditLogRepository: IArticleAuditLogRepository;

  constructor(articleAuditLogRepository: IArticleAuditLogRepository) {
    this.articleAuditLogRepository = articleAuditLogRepository;
  }

  async findByArticleId(articleId: string) {
    return this.articleAuditLogRepository.findByArticleId(articleId);
  }
}
