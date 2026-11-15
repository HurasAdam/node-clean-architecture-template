import { CONFLICT } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IFaqRepository } from "../domain/repository.interface";
import { AddFaqDto } from "../dto/add";

export class FaqService {
  private faqRepository: IFaqRepository;

  constructor(faqRepository: IFaqRepository) {
    this.faqRepository = faqRepository;
  }

  async add(currentUserId: string, payload: AddFaqDto) {
    const faq = await this.faqRepository.findByTitle(payload.title);
    appAssert(!faq, CONFLICT, "FAQ with this title already exists.");

    await this.faqRepository.add(currentUserId, payload);
  }
}
