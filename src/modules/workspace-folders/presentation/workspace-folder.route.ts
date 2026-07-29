/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /workspace-folders
 */

export function createWorkspaceFolderRoutes(container: Container) {
  const router = Router();

  router.post("/", container.workspaceFolder.controller.add);

  return router;
}
