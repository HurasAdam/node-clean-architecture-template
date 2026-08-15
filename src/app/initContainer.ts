/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { AuthMiddleware } from "../middleware/authGuard";
import { createAdminModule } from "../modules/admin/admin.module";
import { createArticleModule } from "../modules/articles/article.module";
import { createAuthModule } from "../modules/auth/auth.module";
import { createContactRegistryModule } from "../modules/contactRegistry/module";
import { createProductCategoryModule } from "../modules/product-categories/product-category.module";
import { createProductTopicModule } from "../modules/product-topics/product-topic.module";
import { createProductModule } from "../modules/products/product.module";
import { createRoleModule } from "../modules/roles/role.module";
import { createSessionModule } from "../modules/sessions/session.module";
import { createTagModule } from "../modules/tags/tag.module";
import { createUsefullLinkCategoryModule } from "../modules/useful-link-categories/usefullLinkCategory.module";
import { createUsefullLinkModule } from "../modules/useful-links/usefullLink.module";
import { createUserModule } from "../modules/users/user.module";
import { createWorkspaceArticleResponseVariantModule } from "../modules/workspace-article-response-variants/module";
import { createWorkspaceArticleModule } from "../modules/workspace-articles/workspace-article.module";
import { createWorkspaceFolderModule } from "../modules/workspace-folders/workspace-folder.module";
import { createWorkspaceMemberModule } from "../modules/workspace-members/workspace-member.module";
import { createWorkspaceModule } from "../modules/workspace/workspace.module";
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

  const contactRegistryModule = createContactRegistryModule({
    contactRegistryRepository: repositories.contactRegistryRepository,
  });

  const productTopicModule = createProductTopicModule({
    productTopicRepository: repositories.productTopicRepository,
    productRepository: repositories.productRepository,
  });

  const usefullLinkModule = createUsefullLinkModule({
    usefullLinkRepository: repositories.usefullLinkRepository,
    usefullLinkCategoryRepository: repositories.usefullLinkCategoryRepository,
    userRepository: repositories.userRepository,
  });

  const usefullLinkCategoryModule = createUsefullLinkCategoryModule({
    usefullLinkCategoryRepository: repositories.usefullLinkCategoryRepository,
  });

  const workspaceModule = createWorkspaceModule({
    workspaceRepository: repositories.workspaceRepository,
    workspaceMemberRepository: repositories.workspaceMemberRepository,
    userRepository: repositories.userRepository,
  });

  const workspaceMemberModule = createWorkspaceMemberModule({
    workspaceMemberRepository: repositories.workspaceMemberRepository,
    userRepository: repositories.userRepository,
    workspaceRepository: repositories.workspaceRepository,
  });

  const workspaceFolderModule = createWorkspaceFolderModule({
    workspaceFolderRepository: repositories.workspaceFolderRepository,
    workspaceArticleRepository: repositories.workspaceArticleRepository,
  });

  const workspaceArticleModule = createWorkspaceArticleModule({
    workspaceArticleRepository: repositories.workspaceArticleRepository,
    workspaceArticleResponseVariantRepository:
      repositories.workspaceArticleResponseVariantRepository,
    workspaceFolderRepository: repositories.workspaceFolderRepository,
    workspaceRepository: repositories.workspaceRepository,
    userRepository: repositories.userRepository,
  });

  const workspaceArticleResponseVariantModule =
    createWorkspaceArticleResponseVariantModule({
      workspaceArticleResponseVariantRepository:
        repositories.workspaceArticleResponseVariantRepository,
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
    contactRegistry: contactRegistryModule,
    usefullLink: usefullLinkModule,
    usefullLinkCategory: usefullLinkCategoryModule,
    workspace: workspaceModule,
    workspaceMember: workspaceMemberModule,
    workspaceFolder: workspaceFolderModule,
    workspaceArticle: workspaceArticleModule,
    workspaceArticleResponseVariant: workspaceArticleResponseVariantModule,
  };
}

export type Container = ReturnType<typeof initContainer>;
