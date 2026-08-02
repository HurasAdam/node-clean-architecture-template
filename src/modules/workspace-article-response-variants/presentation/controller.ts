import { WorkspaceArticleResponseVariantService } from "../application/service";

export class WorkspaceArticleResponseVariantController {
  private workspceArticleResponseVariantService: WorkspaceArticleResponseVariantService;

  constructor(
    workspceArticleResponseVariantService: WorkspaceArticleResponseVariantService,
  ) {
    this.workspceArticleResponseVariantService =
      workspceArticleResponseVariantService;
  }
}
