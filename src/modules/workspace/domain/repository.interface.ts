import { AddWorkspaceDto } from "../dto/add";
import { UpdateWorkspaceDto } from "../dto/update";

export interface IWorkspaceRepository {
  add: (userId: string, payload: AddWorkspaceDto) => Promise<unknown>;
  find: () => Promise<unknown>;
  findOne: (id: string) => Promise<unknown>;
  update: (id: string, payload: UpdateWorkspaceDto) => Promise<unknown>;
}
