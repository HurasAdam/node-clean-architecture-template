import { FaqItemService } from "./application/service";
import { IFaqItemRepository } from "./domain/repository.interface";
import { FaqItemController } from "./presentation/controller";

interface Deps {
  faqItemRepository: IFaqItemRepository;
}

export function createFaqItemModule(deps: Deps) {
  const service = new FaqItemService(deps.faqItemRepository);
  const controller = new FaqItemController(service);

  return { controller };
}
