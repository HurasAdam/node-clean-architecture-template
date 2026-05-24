/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Model } from "mongoose";
import { Product } from "../../domain/product.entity";
import { IProductRepository } from "../../domain/product.repository.interface";
import { CreateProductDto } from "../../dto/create-product.dto";
import { FindProductsQueryDto } from "../../dto/find-products-query.dto";
import { UpdateProductDto } from "../../dto/update-product.dto";
import { ProductDocument } from "../product.model";

export class ProductRepository implements IProductRepository {
  private model;
  constructor(model: Model<ProductDocument>) {
    this.model = model;
  }

  toDomain(doc: ProductDocument): Product {
    return new Product(
      doc._id.toString(),
      doc.name,
      doc.createdBy.toString(),
      doc.createdAt,
      doc.labelColor,
    );
  }

  create(userId: string, data: CreateProductDto) {
    return this.model.create({
      ...data,
      createdBy: userId,
    });
  }

  async find(filters: FindProductsQueryDto): Promise<Product[]> {
    const query: Record<string, unknown> = {};

    if (filters?.name) {
      query.name = { $regex: filters.name, $options: "i" };
    }
    const docs = await this.model.find(query);

    return docs.map((doc) => this.toDomain(doc));
  }

  async findOne(id: string): Promise<Product | null> {
    const doc = await this.model.findById(id);
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findByName(name: string): Promise<Product | null> {
    const doc = await this.model.findOne({ name });

    return doc ? this.toDomain(doc) : null;
  }

  async updateOne(
    id: string,
    payload: UpdateProductDto,
  ): Promise<Product | null> {
    const doc = await this.model.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!doc) return null;

    return this.toDomain(doc);
  }

  async findByProductId() {}

  deleteOne() {}
}
