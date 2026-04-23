import { Model } from "mongoose";
import { Tag } from "../../domain/tag.entity";
import { CreateTagDto } from "../../dto/create-tag.dto";
import { TagDocument } from "../tag.model";

export class tagRepository {
  private model;
  constructor(model: Model<TagDocument>) {
    this.model = model;
  }

  private toDomain(doc: any) {
    return new Tag(
      doc._id.toString(),
      doc.name,
      doc.createdBy,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  create(data: CreateTagDto) {
    this.model.create(data);
  }

  async find() {
    const docs = await this.model.find({});
    return docs.map((doc) => this.toDomain(doc));
  }
}
