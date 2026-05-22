import { CONFLICT, NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IProductRepository } from "../../products/domain/product.repository.interface";
import { IProductTopicRepository } from "../domain/product-topic.repository.interface";
import { CreateProductTopicDto } from "../dto/create-product-topic.dto";
import { UpdateProductTopicDto } from "../dto/update-product-topic.dto";

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

    const alreadyExist = await this.productTopicRepository.findByName(
      payload.name,
    );

    appAssert(!alreadyExist, CONFLICT, "Topic already exists");

    return this.productTopicRepository.create(userId, payload);
  }

  find() {
    return this.productTopicRepository.find();
  }

  findOne(id: string) {
    return this.productTopicRepository.findOne(id);
  }

  async updateOne(id: string, payload: UpdateProductTopicDto) {
    const topic = await this.productTopicRepository.findOne(id);
    appAssert(topic, NOT_FOUND, "Product topic not found");

    if (payload.name) {
      const alreadyExist = await this.productTopicRepository.findByName(
        payload.name,
      );

      appAssert(!alreadyExist, CONFLICT, "Product topic name already exists");
    }

    return this.productTopicRepository.updateOne(id, payload);
  }

  async deleteOne(id: string) {
    const exists = await this.productTopicRepository.findOne(id);
    appAssert(exists, NOT_FOUND, "Topic not found");

    this.productTopicRepository.deleteOne(id);
  }
}
