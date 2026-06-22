/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /tags
 */

export const createTagRoutes = (container: Container) => {
  const router = Router();

  router.post("/", container.tag.controller.create);
  router.get("/", container.tag.controller.find);
  router.get("/details", container.tag.controller.findWithDetails);
  router.get("/:id", container.tag.controller.findOne);
  router.patch("/:id", container.tag.controller.updateOne);

  return router;
};
