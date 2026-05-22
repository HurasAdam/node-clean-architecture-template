import { Model } from "mongoose";
import { ProductTopic } from "../../domain/product-topic.entity";
import { IProductTopicRepository } from "../../domain/product-topic.repository.interface";
import { CreateProductTopicDto } from "../../dto/create-product-topic.dto";
import { UpdateProductTopicDto } from "../../dto/update-product-topic.dto";
import { ProductTopicDocument } from "../product-topic.model";

export class ProductTopicRepository implements IProductTopicRepository {
  private model;
  constructor(model: Model<ProductTopicDocument>) {
    this.model = model;
  }

  private toDomain(doc: ProductTopicDocument) {
    return new ProductTopic(doc._id.toString(), doc.name);
  }

  create(userId: string, data: CreateProductTopicDto) {
    return this.model.create({ ...data, createdBy: userId });
  }
  find() {
    return this.model.find();
  }
  async findOne(id: string) {
    const doc = await this.model.findById(id);

    if (!doc) return null;
    return this.toDomain(doc);
  }
  async findByName(name: string) {
    const doc = await this.model.findOne({ name });
    if (!doc) return null;
    return this.toDomain(doc);
  }
  async findByProductId(id: string): Promise<any[]> {
    const docs = await this.model.find({ product: id });
    return docs.map((doc) => this.toDomain(doc));
  }
  async updateOne(id: string, data: UpdateProductTopicDto) {
    const doc = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!doc) return null;
    return this.toDomain(doc);
  }
  async deleteOne(id: string) {
    const res = await this.model.findByIdAndDelete(id);
    return !!res;
  }
}
