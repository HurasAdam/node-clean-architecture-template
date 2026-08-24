import { User } from "../../users/domain/user.entity";
import { WorkspaceArticleResponseVariantEntity } from "../../workspace-article-response-variants/domain/entity";
import { WorkspaceFolderEntity } from "../../workspace-folders/domain/workspace-folder.entity";
import { WorkspaceEntity } from "../../workspace/domain/workspace.entity";
import { WorkspaceArticleEntity } from "../domain/workspace-folder.entity";

export interface WorkspaceArticleListItemDto {
  id: string;
  title: string;
  label: string | null;
  createdAt: Date;
  createdBy: {
    id: string;
    name: string;
    surname: string;
  } | null;
}

export interface WorkspaceArticleByFolderDto {
  folder: {
    id: string;
    name: string;
    description: string;
    color: string;
    createdAt: Date;
  };

  articles: WorkspaceArticleListItemDto[];
}

export interface WorkspaceArticleDetailsDto {
  id: string;
  title: string;
  label: string | null;

  folder: {
    id: string;
    name: string;
    color: string;
  };

  workspace: {
    id: string;
    name: string;
    labelColor: string;
    iconKey: string;
  };

  createdBy: {
    id: string;
    name: string;
    surname: string;
  } | null;

  variants: {
    id: string;
    variantName: string;
    variantContent: string;
    order: number;
  }[];

  createdAt: Date;
}

type WorkspaceArticleListItemSource = {
  id: string;
  title: string;
  workspaceId: string;
  folderId: string;
  label: string | null;
  createdAt: Date;
  createdBy: {
    id: string;
    name: string;
    surname: string;
  } | null;
};

export class WorkspaceArticleMapper {
  static toListItemDto(
    entity: WorkspaceArticleListItemSource,
  ): WorkspaceArticleListItemDto {
    return {
      id: entity.id,
      title: entity.title,
      label: entity.label,
      createdAt: entity.createdAt,
      createdBy: entity.createdBy,
    };
  }

  static toByFolderDto(data: {
    folder: WorkspaceFolderEntity;
    articles: WorkspaceArticleListItemSource[];
  }): WorkspaceArticleByFolderDto {
    return {
      folder: {
        id: data.folder.id,
        name: data.folder.name,
        description: data.folder.description,
        color: data.folder.color,
        createdAt: data.folder.createdAt,
      },

      articles: data.articles.map((article) => this.toListItemDto(article)),
    };
  }

  static toDetailsDto(data: {
    article: WorkspaceArticleEntity;
    folder: WorkspaceFolderEntity;
    workspace: WorkspaceEntity;
    variants: WorkspaceArticleResponseVariantEntity[];
    author: User | null;
  }): WorkspaceArticleDetailsDto {
    return {
      id: data.article.id,
      title: data.article.title,
      label: data.article.label,

      folder: {
        id: data.folder.id,
        name: data.folder.name,
        color: data.folder.color,
      },

      workspace: {
        id: data.workspace.id,
        name: data.workspace.name,
        labelColor: data.workspace.labelColor,
        iconKey: data.workspace.iconKey,
      },

      createdBy: data.author
        ? {
            id: data.author.id,
            name: data.author.name,
            surname: data.author.surname,
          }
        : null,

      variants: data.variants.map((variant) => ({
        id: variant.id,
        variantName: variant.variantName,
        variantContent: variant.variantContent,
        order: variant.order,
      })),

      createdAt: data.article.createdAt,
    };
  }
}
