import { CREATED, OK } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { FaqItemService } from "../application/service";
import { addFaqItemDto } from "../dto/add";

export class FaqItemController {
  private faqItemService: FaqItemService;

  constructor(faqItemService: FaqItemService) {
    this.faqItemService = faqItemService;
  }

  add = catchErrors(async (req, res) => {
    const payload = addFaqItemDto.parse(req.body);
    const { userId: currentUserId } = req;

    await this.faqItemService.add(currentUserId, payload);

    return res.sendStatus(CREATED);
  });

  findByFaqId = catchErrors(async (req, res) => {
    const { faqId } = req.params;

    const serviceResponse = await this.faqItemService.findByFaqIq(faqId);
    return res.status(OK).json(serviceResponse);
  });
}
