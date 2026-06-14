import { IUsefullLinkCategoryRepository } from "../useful-link-categories/domain/usefullLinkCategory.repository.interface";
import { UsefullLinkService } from "./application/usefull-link.service";
import { IUsefullLinkRepository } from "./domain/usefullLink.repository.interface";
import { UsefullLinkController } from "./presentation/usefull-link.controller";

interface deps {
  usefullLinkRepository: IUsefullLinkRepository;
  usefullLinkCategoryRepository: IUsefullLinkCategoryRepository;
}

export function createUsefullLinkModule(deps: deps) {
  const service = new UsefullLinkService(
    deps.usefullLinkRepository,
    deps.usefullLinkCategoryRepository,
  );

  const controller = new UsefullLinkController(service);

  return {
    controller,
  };
}
