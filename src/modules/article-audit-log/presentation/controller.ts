import { OK } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { ArticleAuditLogService } from "../application/service";

export class ArticleAuditLogController {
  private articleAuditLogService: ArticleAuditLogService;

  constructor(articleAuditLogService: ArticleAuditLogService) {
    this.articleAuditLogService = articleAuditLogService;
  }

  add() {}

  findByArticleId = catchErrors(async (req, res) => {
    const { articleId } = req.params;

    const serviceResponse =
      await this.articleAuditLogService.findByArticleId(articleId);
    return res.status(OK).json(serviceResponse);
  });
}
