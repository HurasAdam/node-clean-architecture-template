import { AddWorkspaceFolderDto } from "../dto/add";

export interface IWorkspaceFolderRepository {
  add: (userId: string, payload: AddWorkspaceFolderDto) => Promise<unknown>;
}
