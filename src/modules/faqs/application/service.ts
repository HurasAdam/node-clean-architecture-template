import { CONFLICT, NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IFaqItemRepository } from "../../faq-item/domain/repository.interface";
import { IUserRepository } from "../../users/domain/user.repository.interface";
import { IFaqRepository } from "../domain/repository.interface";
import { AddFaqDto } from "../dto/add";
import { FaqListItemDto } from "../dto/find-list";
import { FaqDetailsDto } from "../dto/findOne";

export class FaqService {
  private faqRepository: IFaqRepository;
  private faqItemRepository: IFaqItemRepository;
  private userRepository: IUserRepository;

  constructor(
    faqRepository: IFaqRepository,
    faqItemRepository: IFaqItemRepository,
    userRepository: IUserRepository,
  ) {
    this.faqRepository = faqRepository;
    this.faqItemRepository = faqItemRepository;
    this.userRepository = userRepository;
  }

  async add(currentUserId: string, payload: AddFaqDto) {
    const faq = await this.faqRepository.findByTitle(payload.title);
    appAssert(!faq, CONFLICT, "FAQ with this title already exists.");

    await this.faqRepository.add(currentUserId, payload);
  }

  async find(): Promise<FaqListItemDto[]> {
    const faqs = await this.faqRepository.find();

    if (!faqs.length) return [];

    const faqIds = faqs.map((faq) => faq.id);
    const counts = await this.faqItemRepository.countByFaqIds(faqIds);

    const countsMap = new Map(counts.map(({ faqId, count }) => [faqId, count]));

    return faqs.map((faq) => ({
      ...faq,
      questionsCount: countsMap.get(faq.id) ?? 0,
    }));
  }

  async findOneById(faqId: string): Promise<FaqDetailsDto> {
    const faq = await this.faqRepository.findOneById(faqId);

    appAssert(faq, NOT_FOUND, "FAQ not found.");

    const [user, counts] = await Promise.all([
      this.userRepository.findOneById(faq.createdBy),
      this.faqItemRepository.countByFaqIds([faq.id]),
    ]);
    const questionsCount = counts[0]?.count ?? 0;
    appAssert(user, NOT_FOUND, "FAQ creator not found.");

    return {
      id: faq.id,
      title: faq.title,
      description: faq.description,
      status: faq.status,
      iconKey: faq.iconKey,
      questionsCount,
      createdAt: faq.createdAt,
      createdBy: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
      },
    };
  }
}
