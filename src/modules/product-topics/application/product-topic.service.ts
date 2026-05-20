import { IProductTopicRepository } from "../domain/product-topic.repository.interface";

export class ProductTopicService {
  private productTopicRepository;

  constructor(productTopicRepository: IProductTopicRepository) {
    this.productTopicRepository = productTopicRepository;
  }
}
