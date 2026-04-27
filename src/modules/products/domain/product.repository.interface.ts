/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { CreateProductDto } from "../dto/create-product.dto";

export interface IProductRepository {
  create(data: CreateProductDto): Promise<any>;
  find(): Promise<any>;
  findOne(id: string): Promise<any>;
  deleteOne(): any;
}
