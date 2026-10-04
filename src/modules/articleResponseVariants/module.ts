import { ArticleResponseVariantService } from "./application/service";
import { IArticleResponseVariantRepository } from "./domain/repository.interface";
import { ArticleResponseVariantController } from "./presentation/controller";

interface Deps {
  articleResponseVariantRepository: IArticleResponseVariantRepository;
}

export function createArticleResponseVariantModule(deps: Deps) {
  const service = new ArticleResponseVariantService(
    deps.articleResponseVariantRepository,
  );
  const controller = new ArticleResponseVariantController(service);

  return {
    controller,
  };
}
