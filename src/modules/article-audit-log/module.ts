/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { ArticleAuditLogService } from "./application/service";
import { IArticleAuditLogRepository } from "./domain/repository.interface";
import { ArticleAuditLogController } from "./presentation/controller";

interface deps {
  articleAuditLogRepository: IArticleAuditLogRepository;
}

export function createArticleAuditLogModule(deps: deps) {
  const articleAuditLogService = new ArticleAuditLogService(
    deps.articleAuditLogRepository,
  );
  const controller = new ArticleAuditLogController(articleAuditLogService);

  return {
    controller,
  };
}
