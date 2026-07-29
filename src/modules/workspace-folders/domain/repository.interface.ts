export interface IWorkspaceFolderRepository {
  add: (
    userId: string,
    payload: { name: string; workspaceId: string },
  ) => Promise<unknown>;
}
