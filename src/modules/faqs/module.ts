import { IFaqItemRepository } from "../faq-item/domain/repository.interface";
import { IUserRepository } from "../users/domain/user.repository.interface";
import { FaqService } from "./application/service";
import { IFaqRepository } from "./domain/repository.interface";
import { FaqController } from "./presentation/controller";

interface Deps {
  faqRepository: IFaqRepository;
  faqItemRepository: IFaqItemRepository;
  userRepository: IUserRepository;
}

export function createFaqModule(deps: Deps) {
  const service = new FaqService(
    deps.faqRepository,
    deps.faqItemRepository,
    deps.userRepository,
  );
  const controller = new FaqController(service);

  return { controller };
}
