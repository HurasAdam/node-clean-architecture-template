import { FaqStatus } from "../infrastructure/models/mongo";

export class FAqEntity {
  public id: string;
  public title: string;
  public description: string;
  public status: FaqStatus;
  public iconKey: string;
  public createdBy: string;
  public createdAt: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    status: FaqStatus,
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
