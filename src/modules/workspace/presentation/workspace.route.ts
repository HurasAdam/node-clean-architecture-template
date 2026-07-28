/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /workspaces
 */

export const createWorkspaceRoutes = (container: Container) => {
  const router = Router();

  router.post("/", container.workspace.controller.add);
  router.get("/", container.workspace.controller.find);
  router.get("/:workspaceId", container.workspace.controller.findOne);
  router.patch("/:workspaceId", container.workspace.controller.updateOne);

  return router;
};
