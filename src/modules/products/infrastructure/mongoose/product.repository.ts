/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { Model } from "mongoose";
import { IProductRepository } from "../../domain/product.repository.interface";
import { CreateProductDto } from "../../dto/create-product.dto";
import { ProductDocument } from "../product.model";

export class ProductRepository implements IProductRepository {
  private model;
  constructor(model: Model<ProductDocument>) {
    this.model = model;
  }

  create(data: CreateProductDto) {
    return this.model.create(data);
  }

  find() {
    return this.model.find({});
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  deleteOne() {}
}
