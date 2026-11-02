/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { ArticleAuditLogEventType } from "../infrastructure/models/mongo";

export interface ArticleAuditLogChange {
  field: string;
  before: unknown;
  after: unknown;
}

export interface ArticleAuditLogActor {
  userId: string;
  name: string;
  surname: string;
  email: string;
}

export class ArticleAuditLogEntity {
  public id: string;
  public articleId: string;
  public variantId: string | null;
  public eventType: ArticleAuditLogEventType;
  public actor: ArticleAuditLogActor;
  public changes: ArticleAuditLogChange[];
  public createdAt: Date;

  constructor(
    id: string,
    articleId: string,
    variantId: string | null,
    eventType: ArticleAuditLogEventType,
    actor: ArticleAuditLogActor,
    changes: ArticleAuditLogChange[],
    createdAt: Date,
  ) {
    this.id = id;
    this.articleId = articleId;
    this.variantId = variantId;
    this.eventType = eventType;
    this.actor = actor;
    this.changes = changes;
    this.createdAt = createdAt;
  }
}
