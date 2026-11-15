import { FaqService } from "./application/service";
import { IFaqRepository } from "./domain/repository.interface";
import { FaqController } from "./presentation/controller";

interface Deps {
  faqRepository: IFaqRepository;
}

export function createFaqModule(deps: Deps) {
  const service = new FaqService(deps.faqRepository);
  const controller = new FaqController(service);

  return { controller };
}
