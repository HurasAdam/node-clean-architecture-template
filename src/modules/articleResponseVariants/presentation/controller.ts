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

  updateOne = catchErrors(async (req, res) => {
    const { variantId } = req.params;
    const payload = req.body;
    await this.articleResponseVariantService.updateOne(variantId, payload);
    return res.sendStatus(NO_CONTENT);
  });

  deleteOne = catchErrors(async (req, res) => {
    const { variantId } = req.params;
    await this.articleResponseVariantService.deleteOne(variantId);
    return res.sendStatus(NO_CONTENT);
  });
}
