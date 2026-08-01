import { CREATED } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { WorkspaceArticleService } from "../application/workspace-article.service";

export class WorkspaceArticleController {
  private workspaceArticleService: WorkspaceArticleService;

  constructor(workspaceArticleService: WorkspaceArticleService) {
    this.workspaceArticleService = workspaceArticleService;
  }

  add = catchErrors(async (req, res) => {
    const payload = req.body;
    const { userId } = req;
    await this.workspaceArticleService.add(userId, payload);

    return res.sendStatus(CREATED);
  });
}
