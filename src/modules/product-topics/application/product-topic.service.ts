import { CONFLICT, NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IProductRepository } from "../../products/domain/product.repository.interface";
import { IProductTopicRepository } from "../domain/product-topic.repository.interface";
import { CreateProductTopicDto } from "../dto/create-product-topic.dto";

export class ProductTopicService {
  private productTopicRepository: IProductTopicRepository;
  private productRepository: IProductRepository;
  constructor(
    productTopicRepository: IProductTopicRepository,
    productRepository: IProductRepository,
  ) {
    this.productTopicRepository = productTopicRepository;
    this.productRepository = productRepository;
  }

  async create(userId: string, payload: CreateProductTopicDto) {
    const product = await this.productRepository.findOne(payload.product);

    appAssert(product, NOT_FOUND, "Product not found");

    const alreadyExist = this.productTopicRepository.findByName(payload.name);
    appAssert(!alreadyExist, CONFLICT, "Topic already exists");

    return this.productTopicRepository.create(userId, payload);
  }
}
