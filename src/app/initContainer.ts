/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { AuthMiddleware } from "../middleware/authGuard";
import { createArticleModule } from "../modules/articles/article.module";
import { createAuthModule } from "../modules/auth/auth.module";
import { createProductModule } from "../modules/products/product.module";
import { createSessionModule } from "../modules/sessions/session.module";
import { createTagModule } from "../modules/tags/tag.module";
import { createUserModule } from "../modules/users/user.module";

export function initContainer() {
  const userModule = createUserModule();
  const sessionModule = createSessionModule();
  const articleModule = createArticleModule(); // TODO
  const productModule = createProductModule();
  const authModule = createAuthModule({
    userRepository: userModule.repository,
    sessionRepository: sessionModule.repository,
  });

  const tagModule = createTagModule({
    articleRepository: articleModule.repository,
  });

  const authMiddleware = new AuthMiddleware(
    userModule.repository,
    sessionModule.repository,
  );

  return {
    auth: authModule,
    authGuard: authMiddleware,
    user: userModule,
    session: sessionModule,
    tag: tagModule,
    article: articleModule,
    product: productModule,
  };
}

export type Container = ReturnType<typeof initContainer>;
