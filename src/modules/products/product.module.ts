/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { ProductService } from "./application/product.service";
import { ProductRepository } from "./infrastructure/mongoose/product.repository";
import ProductModel from "./infrastructure/product.model";
import { ProductController } from "./presentation/product.controller";

export function createProductModule() {
  const repository = new ProductRepository(ProductModel);
  const service = new ProductService(repository);
  const controller = new ProductController(service);

  return {
    repository,
    controller,
  };
}
