import { Router } from "express";
import { Container } from "../../../app/initContainer";

export const createProductTopicRoutes = (container: Container) => {
  const router = Router();

  router.post("/", container.productTopic.controller.create);
  router.get("/", container.productTopic.controller.find);
  router.get("/:id", container.productTopic.controller.findOne);
  router.patch("/:id", container.productTopic.controller.updateOne);

  return router;
};
