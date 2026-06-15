export class UsefullLink {
  constructor(
    public readonly id: string,
    public name: string,
    public url: string,
    public isFeatured: boolean,
    public createdBy: string,
    public createdAt: Date,
    public updatedAt: Date,
    public linkCategory: string,
    public description?: string,
  ) {}
}
