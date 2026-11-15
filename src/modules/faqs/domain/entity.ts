export class FAqEntity {
  public id: string;
  public title: string;
  public description: string;
  public status: string;
  public iconKey: string;
  public createdBy: string;
  public createdAt: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    status: string,
    iconKey: string,
    createdBy: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.iconKey = iconKey;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
  }
}
