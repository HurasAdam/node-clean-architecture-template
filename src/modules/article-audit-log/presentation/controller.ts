import { ArticleAuditLogService } from "../application/service";

export class ArticleAuditLogController {
  private ArticleAuditLogService: ArticleAuditLogService;

  constructor(ArticleAuditLogService: ArticleAuditLogService) {
    this.ArticleAuditLogService = ArticleAuditLogService;
  }

  add() {}
}
