/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { CreateTagDto } from "../dto/create-tag.dto";
import { FindTagsQueryDto } from "../dto/find-tags-query.dto";
import { UpdateTagDto } from "../dto/update-tag.dto";
import { Tag } from "./tag.entity";

export interface ITagRepository {
  create(userId: string, data: CreateTagDto): Promise<Tag>;
  find(query: FindTagsQueryDto): Promise<Tag[]>;
  findOne(id: string): Promise<Tag | null>;
  findByName(name: string): Promise<Tag | null>;
  findByIds(ids: string[]): Promise<Tag[]>;
  updateOne(id: string, data: UpdateTagDto): Promise<Tag | null>;
  deleteOne(id: string): Promise<Tag | null>;
}
