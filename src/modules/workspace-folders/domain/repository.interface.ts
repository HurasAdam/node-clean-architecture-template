import { AddWorkspaceFolderDto } from "../dto/add";
import { UpdateWorkspaceFolderDto } from "../dto/update";
import { WorkspaceFolderEntity } from "./workspace-folder.entity";

export interface IWorkspaceFolderRepository {
  add: (userId: string, payload: AddWorkspaceFolderDto) => Promise<unknown>;
  findAllByWorkspace: (workspaceId: string) => Promise<unknown>;
  updateOne: (
    folderId: string,
    payload: UpdateWorkspaceFolderDto,
  ) => Promise<WorkspaceFolderEntity | null>;
  deleteOne: (folderId: string) => Promise<boolean>;
}
