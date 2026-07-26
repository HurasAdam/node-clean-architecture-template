import { AddWorkspaceDto } from "../dto/add";
import { UpdateWorkspaceDto } from "../dto/update";
import { WorkspaceEntity } from "./workspace.entity";

export interface IWorkspaceRepository {
  add: (userId: string, payload: AddWorkspaceDto) => Promise<WorkspaceEntity>;
  find: () => Promise<unknown>;
  findOne: (id: string) => Promise<WorkspaceEntity | null>;
  update: (id: string, payload: UpdateWorkspaceDto) => Promise<unknown>;
}
