/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /faq-items
 */

export const createFaqItemRoutes = (container: Container) => {
  const router = Router();

  router.post("/", container.faqItem.controller.add);
  router.get("/:faqId/items", container.faqItem.controller.findByFaqId);

  return router;
};
