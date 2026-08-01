export class WorkspaceArticleEntity {
  constructor(
    public id: string,
    public title: string,
    public workspaceId: string,
    public readonly folderId: string,
    public marker: string | null,
    public createdBy: string,
    public createdAt: Date,
  ) {}
}
