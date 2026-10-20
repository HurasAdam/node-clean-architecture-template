/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /articles
 */

export const createArticleRoutes = (container: Container) => {
  const router = Router();

  router.post("/create", container.article.controller.create);
  router.patch("/:articleId/approve", container.article.controller.approveOne);
  router.patch(
    "/:articleId/request-changes",
    container.article.controller.requestChanges,
  );
  router.get("/", container.article.controller.find);
  router.get("/:articleId", container.article.controller.findOne);

  return router;
};
