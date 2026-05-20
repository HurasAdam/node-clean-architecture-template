/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { ProductTopicService } from "./application/product-topic.service";
import { IProductTopicRepository } from "./domain/product-topic.repository.interface";
import { ProductTopicController } from "./presentation/product-topic.controller";

interface deps {
  productTopicRepository: IProductTopicRepository;
}

export function createProductTopicModule(deps: deps) {
  const service = new ProductTopicService(deps.productTopicRepository);
  const controller = new ProductTopicController(service);

  return {
    controller,
  };
}
