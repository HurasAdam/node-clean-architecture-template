import { usefullLinkCategoryService } from "./application/usefullLinkCategory.service";
import { IUsefullLinkCategoryRepository } from "./domain/usefullLinkCategory.repository.interface";
import { UsefullLinkCategoryController } from "./presentation/usefullLinkCategory.controller";

interface deps {
  usefullLinkCategoryRepository: IUsefullLinkCategoryRepository;
}

export function createUsefullLinkCategoryModule(deps: deps) {
  const service = new usefullLinkCategoryService(
    deps.usefullLinkCategoryRepository,
  );
  const controller = new UsefullLinkCategoryController(service);
  return {
    repository: deps.usefullLinkCategoryRepository,
    controller,
  };
}
