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

  router.patch(
    "/:workspaceId/owner/:newOwnerId",
    container.workspaceMember.controller.transferOwnership,
  );

  router.patch(
    "/:workspaceId/members/:memberId/permissions",
    container.workspaceMember.controller.updatePermissions,
  );

  router.delete(
    "/:workspaceId/members/:memberId",
    container.workspaceMember.controller.deleteOne,
  );

  return router;
};
