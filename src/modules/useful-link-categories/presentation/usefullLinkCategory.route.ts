/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../../../app/initContainer";

export const createUsefullLinkCategoryRoutes = (container: Container) => {
  const router = Router();

  /**
   * prefix
   * /usefull-link-categories
   */

  router.post("/", container.usefullLinkCategory.controller.create);
  router.get("/", container.usefullLinkCategory.controller.find);

  return router;
};
