/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { CONFLICT, NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IProductRepository } from "../../products/domain/product.repository.interface";
import { IProductCategoryRepository } from "../domain/product-category.repository.interface";
import { CreateProductCategoryDto } from "../dto/create-product-category.dto";
import { UpdateProductCategoryDto } from "../dto/update-product-category.dto";

export class ProductCategoryService {
  private productCategoryRepository: IProductCategoryRepository;
  private productRepository: IProductRepository;
  constructor(
    productCategoryRepository: IProductCategoryRepository,
    productRepository: IProductRepository,
  ) {
    this.productCategoryRepository = productCategoryRepository;
    this.productRepository = productRepository;
  }

  async create(userId: string, data: CreateProductCategoryDto) {
    const product = await this.productRepository.findOne(data.productId);
    appAssert(product, NOT_FOUND, "Product not found");

    const alreadyExist = await this.productCategoryRepository.findByName(
      data.name,
    );
    appAssert(!alreadyExist, CONFLICT, "Category already exists");

    return this.productCategoryRepository.create(userId, data);
  }
  find() {
    return this.productCategoryRepository.find();
  }

  findOne(id: string) {
    return this.productCategoryRepository.findOne(id);
  }

  async updateOne(id: string, data: UpdateProductCategoryDto) {
    const productCategory = await this.productCategoryRepository.findOne(id);
    appAssert(productCategory, NOT_FOUND, "Product category not found");

    if (data.name) {
      const existingProductCategory =
        await this.productCategoryRepository.findByName(data.name);

      appAssert(
        !existingProductCategory ||
          existingProductCategory.id === productCategory.id,
        CONFLICT,
        "Product category name already exists",
      );
    }
    return this.productCategoryRepository.updateOne(id, data);
  }

  async deleteOne(id: string) {
    const exists = await this.productCategoryRepository.findOne(id);

    appAssert(exists, NOT_FOUND, "Product category not found");

    return this.productCategoryRepository.deleteOne(id);
  }

  findByProductId(productId: string) {
    return this.productCategoryRepository.findByProductId(productId);
  }
}
