import { AddWorkspaceFolderDto } from "../dto/add";
import { UpdateWorkspaceFolderDto } from "../dto/update";
import { WorkspaceFolderEntity } from "./workspace-folder.entity";

export interface IWorkspaceFolderRepository {
  add: (userId: string, payload: AddWorkspaceFolderDto) => Promise<unknown>;
  findOne: (folderId: string) => Promise<WorkspaceFolderEntity | null>;
  findAllByWorkspace: (workspaceId: string) => Promise<WorkspaceFolderEntity[]>;
  updateOne: (
    folderId: string,
    payload: UpdateWorkspaceFolderDto,
  ) => Promise<WorkspaceFolderEntity | null>;
  deleteOne: (folderId: string) => Promise<boolean>;
}
