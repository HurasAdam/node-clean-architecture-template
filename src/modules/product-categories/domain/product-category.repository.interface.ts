/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { CreateProductCategoryDto } from "../dto/create-product-category.dto";
import { UpdateProductCategoryDto } from "../dto/update-product-category.dto";
import { ProductCategory } from "./product-category.entity";

export interface IProductCategoryRepository {
  create(
    userId: string,
    data: CreateProductCategoryDto,
  ): Promise<ProductCategory>;
  find(): Promise<ProductCategory[]>;
  findByIds(ids: string[]): Promise<ProductCategory[]>;
  findOne(id: string): Promise<ProductCategory | null>;
  findByName(name: string): Promise<ProductCategory | null>;
  findByProductId(id: string): Promise<unknown | null>;
  updateOne(id: string, data: UpdateProductCategoryDto): Promise<any>;
  deleteOne(id: string): Promise<boolean>;
}
