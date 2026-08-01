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

  router.post("/", container.workspaceFolder.controller.add);

  return router;
}
