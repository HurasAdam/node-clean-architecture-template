/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /contact-registry
 */

export const createContactRegistryRoutes = (container: Container) => {
  const router = Router();

  router.post("/", container.contactRegistry.controller.add);

  return router;
};
