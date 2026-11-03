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
    const { userId: currentUserId } = req;
    const payload = req.body;
    await this.articleResponseVariantService.updateOne(
      variantId,
      currentUserId,
      payload,
    );
    return res.sendStatus(NO_CONTENT);
  });

  deleteOne = catchErrors(async (req, res) => {
    const { variantId } = req.params;
    const { userId: currentUserId } = req;
    await this.articleResponseVariantService.deleteOne(
      variantId,
      currentUserId,
    );
    return res.sendStatus(NO_CONTENT);
  });
}
