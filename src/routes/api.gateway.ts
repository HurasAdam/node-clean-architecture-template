/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../app/initContainer";
import { createAdminRoutes } from "../modules/admin/presentation/admin.route";
import { createArticleRoutes } from "../modules/articles/presentation/article.route";
import { createAuthRoutes } from "../modules/auth/presentation/auth.route";
import { createProductCategoryRoutes } from "../modules/product-categories/presentation/product-category.route";
import { createProductTopicRoutes } from "../modules/product-topics/presentation/product-topic.route";
import { createProductRoutes } from "../modules/products/presentation/product.route";
import { createRoleRoutes } from "../modules/roles/presentation/role.route";
import { createSessionRoutes } from "../modules/sessions/presentation/session.route";
import { createTagRoutes } from "../modules/tags/presentation/tag.route";
import { createUsefullLinkCategoryRoutes } from "../modules/useful-link-categories/presentation/usefullLinkCategory.route";
import { createUsefullLinkRoutes } from "../modules/useful-links/presentation/usefull-link.route";
import { createUserRoutes } from "../modules/users/presentation/user.route";
import { createWorkspaceRoutes } from "../modules/workspace/presentation/workspace.route";

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
   * Admin
   */
  router.use(
    "/admin",
    container.authGuard.authenticate,
    createAdminRoutes(container),
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
   * Roles
   */

  router.use(
    "/roles",
    container.authGuard.authenticate,
    createRoleRoutes(container),
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

  /**
   * Product categories
   */

  router.use(
    "/product-categories",
    container.authGuard.authenticate,
    createProductCategoryRoutes(container),
  );

  /**
   * Product topics
   */

  router.use(
    "/product-topics",
    container.authGuard.authenticate,
    createProductTopicRoutes(container),
  );

  /**
   * Usefull links
   */

  router.use(
    "/usefull-links",
    container.authGuard.authenticate,
    createUsefullLinkRoutes(container),
  );

  /**
   * Usefull link categories
   */

  router.use(
    "/usefull-link-categories",
    container.authGuard.authenticate,
    createUsefullLinkCategoryRoutes(container),
  );

  /**
   * Workspaces
   */

  router.use(
    "/workspaces",
    container.authGuard.authenticate,
    createWorkspaceRoutes(container),
  );

  return router;
}
