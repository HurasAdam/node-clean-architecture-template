import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /article-response-variants
 */

export const createArticleResponseVariantRoutes = (container: Container) => {
  const router = Router();

  router.post("/create", container.articleResponseVariant.controller.add);

  return router;
};
