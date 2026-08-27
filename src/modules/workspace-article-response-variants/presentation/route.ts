/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /workspace-article-response-variants
 */

export const createWorkspaceArticleResponseVariantRoutes = (
  container: Container,
) => {
  const router = Router();

  router.post("/", container.workspaceArticleResponseVariant.controller.add);
  router.patch(
    "/:responseVariantId",
    container.workspaceArticleResponseVariant.controller.updateOne,
  );

  return router;
};
