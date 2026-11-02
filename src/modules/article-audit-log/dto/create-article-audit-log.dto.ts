/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import {
  ArticleAuditLogChange,
  ArticleAuditLogEventType,
} from "../infrastructure/models/mongo";

export interface CreateArticleAuditLogDTO {
  articleId: string;
  variantId?: string;

  eventType: ArticleAuditLogEventType;

  actorId: string;
  actorName: string;
  actorRole: string;

  changes: ArticleAuditLogChange[];
}
