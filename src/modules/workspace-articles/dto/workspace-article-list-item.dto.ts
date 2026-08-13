import { WorkspaceArticleResponseVariantEntity } from "../../workspace-article-response-variants/domain/entity";
import { WorkspaceFolderEntity } from "../../workspace-folders/domain/workspace-folder.entity";
import { WorkspaceEntity } from "../../workspace/domain/workspace.entity";
import { WorkspaceArticleEntity } from "../domain/workspace-folder.entity";

export interface WorkspaceArticleListItemDto {
  id: string;
  title: string;
  marker: string | null;
  createdAt: Date;
  createdBy: {
    id: string;
    name: string;
    surname: string;
  } | null;
}

export interface WorkspaceArticleDetailsDto {
  id: string;
  title: string;
  marker: string | null;

  folder: {
    id: string;
    name: string;
  };

  workspace: {
    id: string;
    name: string;
    labelColor: string;
    iconKey: string;
  };

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
  marker: string | null;
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
      marker: entity.marker,
      createdAt: entity.createdAt,
      createdBy: entity.createdBy,
    };
  }

  static toDetailsDto(data: {
    article: WorkspaceArticleEntity;
    folder: WorkspaceFolderEntity;
    workspace: WorkspaceEntity;
    variants: WorkspaceArticleResponseVariantEntity[];
  }): WorkspaceArticleDetailsDto {
    return {
      id: data.article.id,
      title: data.article.title,
      marker: data.article.marker,

      folder: {
        id: data.folder.id,
        name: data.folder.name,
      },

      workspace: {
        id: data.workspace.id,
        name: data.workspace.name,
        labelColor: data.workspace.labelColor,
        iconKey: data.workspace.iconKey,
      },

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
