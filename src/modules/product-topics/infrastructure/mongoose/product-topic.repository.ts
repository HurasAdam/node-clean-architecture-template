import { Model } from "mongoose";
import { IProductTopicRepository } from "../../domain/product-topic.repository.interface";
import { CreateProductTopicDto } from "../../dto/create-product-topic.dto";
import { ProductTopicDocument } from "../product-topic.model";

export class ProductTopicRepository implements IProductTopicRepository {
  private model;
  constructor(model: Model<ProductTopicDocument>) {
    this.model = model;
  }

  create(userId: string, data: CreateProductTopicDto) {
    return this.model.create({ ...data, createdBy: userId });
  }
  find() {
    return this.model.find();
  }
  findOne(id: string) {
    return this.model.findById(id);
  }
  findByName(name: string) {
    return this.model.findOne({ name });
  }
  findByProductId(id: string) {
    return this.model.findOne({ product: id });
  }
  updateOne(id: string, data: unknown) {
    return this.model.findByIdAndUpdate(id, {
      data,
    });
  }
  async deleteOne(id: string) {
    const res = await this.model.findByIdAndDelete(id);
    return !!res;
  }
}
