import { AddFaqDto } from "../dto/add";
import { FaqListItemDto } from "../dto/find-list";
import { FAqEntity } from "./entity";

export interface IFaqRepository {
  add: (currentUserId: string, payload: AddFaqDto) => Promise<any>;

  findByTitle(title: string): Promise<FAqEntity | null>;

  find(): Promise<FaqListItemDto[]>;

  findOneById: (faqId: string) => Promise<FAqEntity | null>;
}
