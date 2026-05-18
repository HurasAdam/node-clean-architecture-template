/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /product-categories
 */

export const createProductCategoryRoutes = (container: Container) => {
  const router = Router();

  router.post(
    "/",
    container.authGuard.authenticate,
    container.productCategory.controller.create,
  );

  router.get(
    "/",
    container.authGuard.authenticate,
    container.productCategory.controller.find,
  );

  router.get(
    "/:id",
    container.authGuard.authenticate,
    container.productCategory.controller.findOne,
  );

  router.patch(
    "/:id",
    container.authGuard.authenticate,
    container.productCategory.controller.updateOne,
  );

  router.delete(
    "/:id",
    container.authGuard.authenticate,
    container.productCategory.controller.deleteOne,
  );

  return router;
};
