/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { CreateProductDto } from "../dto/create-product.dto";
import { FindProductsQueryDto } from "../dto/find-products-query.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { Product } from "./product.entity";

export interface IProductRepository {
  create(userId: string, data: CreateProductDto): Promise<any>;
  find(query: FindProductsQueryDto): Promise<Product[]>;
  findOne(id: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  updateOne(id: string, payload: UpdateProductDto): Promise<Product | null>;
  deleteOne(): any;
}
