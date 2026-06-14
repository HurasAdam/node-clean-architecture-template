import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /usefull-links
 */

export function createUsefullLinkRoutes(container: Container) {
  const router = Router();

  router.post("/", container.usefullLink.controller.create);
  router.get("/", container.usefullLink.controller.find);
  router.get(
    "/with-category",
    container.usefullLink.controller.findWithCategory,
  );
  router.get("/:id", container.usefullLink.controller.findOne);

  return router;
}
