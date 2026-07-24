/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Router } from "express";
import { Container } from "../../../app/initContainer";

/**
 * prefix
 * /users
 */

export const createUserRoutes = (container: Container) => {
  const router = Router();

  /**
   * GET /users
   * returns basic users list (id, name, surname, email)
   */
  router.get("/", container.user.controller.find);

  /**
   * GET /users/options
   * returns users formatted for select inputs (value/label)
   */

  router.get("/options", container.user.controller.find);

  /**
   * GET /users/details
   * returns full users data with user role details
   */

  router.get("/details", container.user.controller.findWithDetails);

  /**
   * GET /users/workspace-candidates
   * returns users that can be added as workspace members.
   */

  router.get(
    "/workspace-candidates",
    container.user.controller.findWorkspaceCandidates,
  );

  /**
   * GET /users/:userId
   * returns single user
   */

  router.get("/:userId", container.user.controller.findOne);

  /**
   * POST /users
   * creates new user
   */

  router.post("/create", container.user.controller.create);

  return router;
};
