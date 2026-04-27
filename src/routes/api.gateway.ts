/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../app/initContainer";
import { createArticleRoutes } from "../modules/articles/presentation/article.route";
import { createAuthRoutes } from "../modules/auth/presentation/auth.route";
import { createProductRoutes } from "../modules/products/presentation/product.route";
import { createSessionRoutes } from "../modules/sessions/presentation/session.route";
import { createTagRoutes } from "../modules/tags/presentation/tag.route";
import { createUserRoutes } from "../modules/users/presentation/user.route";

/**
 * Creates and configures the main API router.
 *
 * This is the composition root for all HTTP routes.
 * It wires modules with shared dependencies from the DI container.
 *
 * @param container - Application dependency container
 * @returns Configured Express router
 */

export function createApiRouter(container: Container) {
  const router = Router();

  router.get("/", (req, res) => {
    return res.status(200).json({
      message: " API is Live",
      status: "ok",
      service: "knowledge-base-api",
      version: "1.0.0",
      docs: "Soon",
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * Auth
   */
  router.use("/auth", createAuthRoutes(container));

  /**
   * Sessions
   */
  router.use(
    "/sessions",
    container.authGuard.authenticate,
    createSessionRoutes(container),
  );

  /**
   * Users
   */
  router.use(
    "/users",
    container.authGuard.authenticate,
    createUserRoutes(container),
  );

  /**
   * Articles
   */

  router.use(
    "/articles",
    container.authGuard.authenticate,
    createArticleRoutes(container),
  );

  /**
   * Tags
   */

  router.use(
    "/tags",
    container.authGuard.authenticate,
    createTagRoutes(container),
  );

  /**
   * Products
   */

  router.use(
    "/products",
    container.authGuard.authenticate,
    createProductRoutes(container),
  );

  return router;
}
