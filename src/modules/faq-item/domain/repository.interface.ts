import { AddFaqItemDto } from "../dto/add";

export interface IFaqItemRepository {
  add: (currentUserId: string, payload: AddFaqItemDto) => Promise<void>;
}
