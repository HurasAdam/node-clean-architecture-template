import { Model } from "mongoose";
import { WorkspaceArticleResponseVariantDocument } from "../../models/mongo";

export class WorkspaceArticleResponseVariantRepository {
  private model: Model<WorkspaceArticleResponseVariantDocument>;

  constructor(model: Model<WorkspaceArticleResponseVariantDocument>) {
    this.model = model;
  }
}
