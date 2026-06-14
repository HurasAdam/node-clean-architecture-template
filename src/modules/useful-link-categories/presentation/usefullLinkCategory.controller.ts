import { CREATED, OK } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { usefullLinkCategoryService } from "../application/usefullLinkCategory.service";

export class UsefullLinkCategoryController {
  private usefullLinkCategoryService;

  constructor(usefullLinkCategoryService: usefullLinkCategoryService) {
    this.usefullLinkCategoryService = usefullLinkCategoryService;
  }

  create = catchErrors(async ({ body, userId }, res) => {
    const payload = body;
    await this.usefullLinkCategoryService.create(userId, payload);
    return res.sendStatus(CREATED);
  });

  find = catchErrors(async (req, res) => {
    const serviceResponse = await this.usefullLinkCategoryService.find();
    return res.status(OK).json(serviceResponse);
  });
}
