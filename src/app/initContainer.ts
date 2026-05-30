/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { AuthMiddleware } from "../middleware/authGuard";
import { createAdminModule } from "../modules/admin/admin.module";
import { createArticleModule } from "../modules/articles/article.module";
import { createAuthModule } from "../modules/auth/auth.module";
import { createProductCategoryModule } from "../modules/product-categories/product-category.module";
import { createProductTopicModule } from "../modules/product-topics/product-topic.module";
import { createProductModule } from "../modules/products/product.module";
import { createRoleModule } from "../modules/roles/role.module";
import { createSessionModule } from "../modules/sessions/session.module";
import { createTagModule } from "../modules/tags/tag.module";
import { createUserModule } from "../modules/users/user.module";
import { initRepositories } from "./initRepositories";

export function initContainer() {
  const repositories = initRepositories();

  const userModule = createUserModule({
    userRepository: repositories.userRepository,
    roleRepository: repositories.roleRepository,
  });
  const sessionModule = createSessionModule({
    sessionRepository: repositories.sessionRepository,
  });
  const articleModule = createArticleModule({
    articleRepository: repositories.articleRepository,
  });
  const productModule = createProductModule({
    productRepository: repositories.productRepository,
    productCategoryRepository: repositories.productCategoryRepository,
    productTopicRepository: repositories.productTopicRepository,
  });
  const roleModule = createRoleModule({
    roleRepository: repositories.roleRepository,
  });
  const productCategoryModule = createProductCategoryModule({
    productRepository: repositories.productRepository,
    productCategoryRepository: repositories.productCategoryRepository,
  });

  const productTopicModule = createProductTopicModule({
    productTopicRepository: repositories.productTopicRepository,
    productRepository: repositories.productRepository,
  });

  //
  const authModule = createAuthModule({
    userRepository: repositories.userRepository,
    sessionRepository: repositories.sessionRepository,
    roleRepository: repositories.roleRepository,
  });

  const tagModule = createTagModule({
    tagRepository: repositories.tagRepository,
    articleRepository: repositories.articleRepository,
    userRepository: repositories.userRepository,
  });

  const adminModule = createAdminModule({
    userRepository: repositories.userRepository,
    roleRepository: repositories.roleRepository,
  });

  const authMiddleware = new AuthMiddleware(
    repositories.userRepository,
    repositories.sessionRepository,
  );

  return {
    auth: authModule,
    authGuard: authMiddleware,
    admin: adminModule,
    user: userModule,
    session: sessionModule,
    role: roleModule,
    tag: tagModule,
    article: articleModule,
    product: productModule,
    productCategory: productCategoryModule,
    productTopic: productTopicModule,
  };
}

export type Container = ReturnType<typeof initContainer>;
