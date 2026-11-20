import { IFaqItemRepository } from "../domain/repository.interface";
import { AddFaqItemDto } from "../dto/add";

export class FaqItemService {
  private faqItemRepository: IFaqItemRepository;

  constructor(faqItemRepository: IFaqItemRepository) {
    this.faqItemRepository = faqItemRepository;
  }

  async add(currentUserId: string, payload: AddFaqItemDto) {
    return this.faqItemRepository.add(currentUserId, payload);
  }

  async findByFaqIq(faqId: string) {
    return this.faqItemRepository.findByFaqId(faqId);
  }
}
