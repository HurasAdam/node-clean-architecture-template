import catchErrors from "../../../utils/catchErrors";
import { usefullLinkCategoryService } from "../application/usefullLinkCategory.service";

export class UsefullLinkCategoryController {
  private usefullLinkCategoryService;

  constructor(usefullLinkCategoryService: usefullLinkCategoryService) {
    this.usefullLinkCategoryService = usefullLinkCategoryService;
  }

  create = catchErrors(async ({ body, userId }, res) => {
    const payload = body;
    return this.usefullLinkCategoryService.create(userId, payload);
  });

  find = catchErrors(async (req, res) => {
    return this.usefullLinkCategoryService.find();
  });
}
