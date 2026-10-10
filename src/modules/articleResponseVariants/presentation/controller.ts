import { CREATED, NO_CONTENT } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { ArticleResponseVariantService } from "../application/service";

export class ArticleResponseVariantController {
  private articleResponseVariantService;
  constructor(articleResponseVariantService: ArticleResponseVariantService) {
    this.articleResponseVariantService = articleResponseVariantService;
  }

  add = catchErrors(async (req, res) => {
    const payload = req.body;
    const { userId: currentUserId } = req;

    await this.articleResponseVariantService.add(currentUserId, payload);

    return res.sendStatus(CREATED);
  });

  deleteOne = catchErrors(async (req, res) => {
    const { variantId } = req.params;
    await this.articleResponseVariantService.deleteOne(variantId);
    return res.sendStatus(NO_CONTENT);
  });
}
