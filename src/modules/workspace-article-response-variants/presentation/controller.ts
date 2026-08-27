import { CREATED, NO_CONTENT } from "../../../constants/http";
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

  updateOne = catchErrors(async (req, res) => {
    const payload = req.body;
    const { userId } = req;
    const { responseVariantId } = req.params;

    await this.workspceArticleResponseVariantService.updateOne(
      userId,
      responseVariantId,
      payload,
    );

    return res.sendStatus(NO_CONTENT);
  });
}
