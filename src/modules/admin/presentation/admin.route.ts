/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /admin
 */

export function createAdminRoutes(container: Container) {
  const router = Router();

  router.post("/create-user", container.admin.controller.create);

  router.get("/users/:id", container.admin.controller.findUserWithDetails);

  return router;
}
