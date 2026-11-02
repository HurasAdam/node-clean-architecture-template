/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /article-audit-logs
 */

export const createArticleAuditLogsRoutes = (container: Container) => {
  const router = Router();

  router.post("/create", container.articleAuditLog.controller.add);

  return router;
};
