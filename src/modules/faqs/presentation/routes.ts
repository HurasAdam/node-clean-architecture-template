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
  router.get("/:faqId", container.faq.controller.findOneById);
  router.patch("/:faqId/title", container.faq.controller.updateTitle);
  router.patch(
    "/:faqId/description",
    container.faq.controller.updateDescription,
  );

  router.patch("/:faqId/icon", container.faq.controller.updateIcon);
  router.patch("/:faqId/toggle-status", container.faq.controller.toggleStatus);

  return router;
};
