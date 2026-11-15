import { AddFaqItemDto } from "../dto/add";
import { FAqItemEntity } from "./entity";

export interface IFaqItemRepository {
  add(currentUserId: string, payload: AddFaqItemDto): Promise<void>;

  countByFaqIds(faqIds: string[]): Promise<{ faqId: string; count: number }[]>;

  findByFaqId(faqId: string): Promise<FAqItemEntity[]>;
}
