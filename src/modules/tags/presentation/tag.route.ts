import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /tags
 */

export const createTagRoutes = (container: Container) => {
  const router = Router();

  router.get("/");

  return router;
};
