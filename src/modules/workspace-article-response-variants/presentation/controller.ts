import { CREATED } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { WorkspaceArticleResponseVariantService } from "../application/service";

export class WorkspaceArticleResponseVariantController {
  private workspceArticleResponseVariantService: WorkspaceArticleResponseVariantService;

  constructor(
    workspceArticleResponseVariantService: WorkspaceArticleResponseVariantService,
  ) {
    this.workspceArticleResponseVariantService =
      workspceArticleResponseVariantService;
  }

  add = catchErrors(async (req, res) => {
    const payload = req.body;
    const { userId } = req;

    await this.workspceArticleResponseVariantService.add(userId, payload);

    return res.sendStatus(CREATED);
  });
}
