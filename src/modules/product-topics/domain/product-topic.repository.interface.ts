/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

export interface IProductTopicRepository {
  create(userId: string, data: unknown): Promise<unknown>;
  find(): Promise<unknown[]>;
  findOne(id: string): Promise<unknown | null>;
  findByName(name: string): Promise<unknown | null>;
  findByProductId(id: string): Promise<unknown | null>;
  updateOne(id: string, data: unknown): Promise<any>;
  deleteOne(id: string): Promise<boolean>;
}
