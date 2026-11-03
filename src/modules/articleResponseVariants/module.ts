import { IArticleAuditLogRepository } from "../article-audit-log/domain/repository.interface";
import { IUserRepository } from "../users/domain/user.repository.interface";
import { ArticleResponseVariantService } from "./application/service";
import { IArticleResponseVariantRepository } from "./domain/repository.interface";
import { ArticleResponseVariantController } from "./presentation/controller";

interface Deps {
  articleResponseVariantRepository: IArticleResponseVariantRepository;
  articleAuditLogRepository: IArticleAuditLogRepository;
  userRepository: IUserRepository;
}

export function createArticleResponseVariantModule(deps: Deps) {
  const service = new ArticleResponseVariantService(
    deps.articleResponseVariantRepository,
    deps.articleAuditLogRepository,
    deps.userRepository,
  );
  const controller = new ArticleResponseVariantController(service);

  return {
    controller,
  };
}
