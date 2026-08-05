import { WorkspaceArticleEntity } from "../domain/workspace-folder.entity";

export interface WorkspaceArticleListItemDto {
  id: string;
  title: string;
  marker: string | null;
}

export class WorkspaceArticleMapper {
  static toListItemDto(
    entity: WorkspaceArticleEntity,
  ): WorkspaceArticleListItemDto {
    return {
      id: entity.id,
      title: entity.title,
      marker: entity.marker,
    };
  }

  static toDetailsDto(entity: WorkspaceArticleEntity) {
    return {
      id: entity.id,
      title: entity.title,
      marker: entity.marker,
      folderId: entity.folderId,
      createdAt: entity.createdAt,
    };
  }
}
