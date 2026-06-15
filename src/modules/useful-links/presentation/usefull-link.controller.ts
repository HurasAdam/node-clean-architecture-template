import { CREATED, OK } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { UsefullLinkService } from "../application/usefull-link.service";

export class UsefullLinkController {
  private usefullLinkService;
  constructor(usefullLinkService: UsefullLinkService) {
    this.usefullLinkService = usefullLinkService;
  }

  create = catchErrors(async ({ body, userId }, res) => {
    const payload = body;

    await this.usefullLinkService.create(userId, payload);
    return res.sendStatus(CREATED);
  });

  find = catchErrors(async (req, res) => {
    const serviceResponse = await this.usefullLinkService.find();
    return res.status(OK).json(serviceResponse);
  });

  findWithCategory = catchErrors(async (req, res) => {
    const serviceResponse = await this.usefullLinkService.findWithCategory();
    return res.status(OK).json(serviceResponse);
  });

  findOne = catchErrors(async ({ params }, res) => {
    const { id } = params;

    const serviceResponse = await this.usefullLinkService.findOne(id);
    return res.status(OK).json(serviceResponse);
  });

  findOneWithDetails = catchErrors(async ({ params }, res) => {
    const { id } = params;

    const serviceResponse =
      await this.usefullLinkService.findOneWithDetails(id);
    return res.status(OK).json(serviceResponse);
  });
}
