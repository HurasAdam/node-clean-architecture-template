import { CreateTagDto } from "../dto/create-tag.dto";

export interface ITagRepository {
  create(data: CreateTagDto): Promise<any>;
  find(): Promise<any>;
  findOne(): Promise<any>;
  updateOne(): Promise<any>;
  deleteOne(): Promise<any>;
}
