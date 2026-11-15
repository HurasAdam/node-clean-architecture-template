import { IFaqRepository } from "../domain/repository.interface";
import { AddFaqDto } from "../dto/add";

export class FaqService {
  private faqRepository: IFaqRepository;

  constructor(faqRepository: IFaqRepository) {
    this.faqRepository = faqRepository;
  }

  async add(currentUserId: string, payload: AddFaqDto) {
    await this.faqRepository.add(currentUserId, payload);
  }
}
