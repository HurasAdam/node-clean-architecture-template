import { CREATED, OK } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { FaqService } from "../application/service";
import { addFaqDto } from "../dto/add";

export class FaqController {
  private faqService: FaqService;

  constructor(faqService: FaqService) {
    this.faqService = faqService;
  }

  add = catchErrors(async (req, res) => {
    const payload = addFaqDto.parse(req.body);
    const { userId: currentUser } = req;

    await this.faqService.add(currentUser, payload);

    return res.sendStatus(CREATED);
  });

  find = catchErrors(async (req, res) => {
    const serviceResponse = await this.faqService.find();
    return res.status(OK).json(serviceResponse);
  });
}
