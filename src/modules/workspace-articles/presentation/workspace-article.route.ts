/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /workspace-articles
 */

export function createWorkspaceArticleRoutes(container: Container) {
  const router = Router();

  router.post("/", container.workspaceArticle.controller.add);
  router.get(
    "/:workspaceId/articles/:articleId",
    container.workspaceArticle.controller.findOne,
  );
  router.get(
    "/:workspaceId/folders/:folderId/articles",
    container.workspaceArticle.controller.findByFolder,
  );

  router.patch(
    "/:workspaceId/articles/:articleId",
    container.workspaceArticle.controller.updateOne,
  );

  return router;
}
