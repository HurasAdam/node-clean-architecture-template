import { ProductTopicService } from "../application/product-topic.service";

export class ProductTopicController {
  private service;
  constructor(service: ProductTopicService) {
    this.service = service;
  }
}
