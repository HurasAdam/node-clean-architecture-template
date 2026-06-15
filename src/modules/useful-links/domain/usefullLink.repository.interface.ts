/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { UsefullLink } from "./usefullLink.entity";

export interface IUsefullLinkRepository {
  create(userId: string, data: unknown): Promise<any>;
  find(): Promise<UsefullLink[]>;
  findOne(id: string): Promise<UsefullLink | null>;
  findByName(name: string): Promise<unknown | null>;
  updateOne(id: string, payload: unknown): Promise<unknown | null>;
  deleteOne(): any;
}
