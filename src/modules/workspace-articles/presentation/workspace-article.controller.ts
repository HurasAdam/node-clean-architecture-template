import { CREATED, NOT_FOUND, OK } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import catchErrors from "../../../utils/catchErrors";
import { WorkspaceArticleService } from "../application/workspace-article.service";
import { WorkspaceArticleMapper } from "../dto/workspace-article-list-item.dto";

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

  findOne = catchErrors(async (req, res) => {
    const { workspaceId, articleId } = req.params;
    const { userId } = req;

    const result = await this.workspaceArticleService.findOne(
      userId,
      workspaceId,
      articleId,
    );

    appAssert(result, NOT_FOUND, "Article not found");
    return res.status(OK).json(WorkspaceArticleMapper.toDetailsDto(result));
  });

  findByFolder = catchErrors(async (req, res) => {
    const { workspaceId, folderId } = req.params;
    const { userId } = req;

    const serviceResponse = await this.workspaceArticleService.findByFolder(
      userId,
      workspaceId,
      folderId,
    );

    return res
      .status(OK)
      .json(serviceResponse.map(WorkspaceArticleMapper.toListItemDto));
  });
}
