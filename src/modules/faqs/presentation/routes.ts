/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /faqs
 */

export const createFaqRoutes = (container: Container) => {
  const router = Router();

  router.post("/", container.faq.controller.add);
  router.get("/", container.faq.controller.find);

  return router;
};
