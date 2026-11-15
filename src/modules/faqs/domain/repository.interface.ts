import { AddFaqDto } from "../dto/add";

export interface IFaqRepository {
  add: (currentUserId: string, payload: AddFaqDto) => Promise<any>;
}
