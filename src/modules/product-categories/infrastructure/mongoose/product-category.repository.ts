/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Model } from "mongoose";
import { ProductCategory } from "../../domain/product-category.entity";
import { IProductCategoryRepository } from "../../domain/product-category.repository.interface";
import { CreateProductCategoryDto } from "../../dto/create-product-category.dto";
import { UpdateProductCategoryDto } from "../../dto/update-product-category.dto";
import { ProductCategoryDocument } from "../product-category.model";

export class ProductCategoryRepository implements IProductCategoryRepository {
  private model;
  constructor(model: Model<ProductCategoryDocument>) {
    this.model = model;
  }

  private toDomain(doc: ProductCategoryDocument): ProductCategory {
    return new ProductCategory(doc._id.toString(), doc.name);
  }

  async create(
    userId: string,
    data: CreateProductCategoryDto,
  ): Promise<ProductCategory> {
    const doc = await this.model.create({
      createdBy: userId,
      updatedBy: userId,
      ...data,
    });
    return this.toDomain(doc);
  }

  async find(): Promise<ProductCategory[]> {
    const docs = await this.model.find();
    const res = docs.map((doc) => this.toDomain(doc));
    return res;
  }

  async findByIds(ids: string[]): Promise<ProductCategory[]> {
    return this.model.find({
      _id: { $in: ids },
    });
  }

  async findOne(id: string): Promise<ProductCategory | null> {
    const doc = await this.model.findById(id);
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findByName(name: string): Promise<ProductCategory | null> {
    const doc = await this.model.findOne({ name });
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findByProductId(id: string): Promise<ProductCategory[]> {
    const docs = await this.model.find({ productId: id });

    return docs.map((doc) => this.toDomain(doc));
  }

  async updateOne(
    id: string,
    data: UpdateProductCategoryDto,
  ): Promise<ProductCategory | null> {
    const doc = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!doc) return null;
    return this.toDomain(doc);
  }

  async deleteOne(id: string): Promise<boolean> {
    const res = await this.model.findByIdAndDelete(id);
    return !!res;
  }
}
