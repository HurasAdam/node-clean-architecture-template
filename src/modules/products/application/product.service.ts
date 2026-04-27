/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { IProductRepository } from "../domain/product.repository.interface";
import { CreateProductDto } from "../dto/create-product.dto";

export class ProductService {
  private productRepository;
  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  create(data: CreateProductDto) {
    return this.productRepository.create(data);
  }

  find() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    return this.productRepository.findOne(id);
  }
}
