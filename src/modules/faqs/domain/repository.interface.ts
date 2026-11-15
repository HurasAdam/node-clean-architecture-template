import { AddFaqDto } from "../dto/add";
import { FAqEntity } from "./entity";

export interface IFaqRepository {
  add: (currentUserId: string, payload: AddFaqDto) => Promise<any>;

  findByTitle(title: string): Promise<FAqEntity | null>;
}
