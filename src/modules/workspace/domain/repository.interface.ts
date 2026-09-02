import { AddWorkspaceDto } from "../dto/add";
import { UpdateWorkspaceDto } from "../dto/update";
import { WorkspaceEntity } from "./workspace.entity";

export interface IWorkspaceRepository {
  add: (userId: string, payload: AddWorkspaceDto) => Promise<WorkspaceEntity>;
  find: () => Promise<unknown>;
  findOne: (id: string) => Promise<WorkspaceEntity | null>;
  updateOne: (
    id: string,
    payload: UpdateWorkspaceDto,
  ) => Promise<WorkspaceEntity | null>;

  updateOwner: (
    workspaceId: string,
    newOwnerId: string,
  ) => Promise<WorkspaceEntity | null>;
}
