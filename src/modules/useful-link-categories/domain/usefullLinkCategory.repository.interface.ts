/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { UsefullLinkCategory } from "./usefullLinkCategory.entity";

export interface IUsefullLinkCategoryRepository {
  create(userId: string, data: unknown): Promise<any>;
  find(): Promise<unknown[]>;
  findByIds: (ids: string[]) => Promise<UsefullLinkCategory[]>;
  findOne(id: string): Promise<unknown | null>;
  findByName(name: string): Promise<unknown | null>;
  updateOne(id: string, payload: unknown): Promise<unknown | null>;
  deleteOne(): any;
}
