/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /products
 */

export const createProductRoutes = (container: Container) => {
  const router = Router();

  router.post("/", container.product.controller.create);
  router.get("/", container.product.controller.find);
  router.get("/:id", container.product.controller.findOne);

  return router;
};
