/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /workspace-members
 */

export const createWorkspaceMemberRoutes = (container: Container) => {
  const router = Router();

  router.post("/", container.workspaceMember.controller.add);
  router.get(
    "/:workspaceId/members",
    container.workspaceMember.controller.findByWorkspaceId,
  );

  return router;
};
