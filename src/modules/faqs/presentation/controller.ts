import { CREATED, NO_CONTENT, OK } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { FaqService } from "../application/service";
import { addFaqDto } from "../dto/add";
import { updateFaqDescriptionDto } from "../dto/update-description.dto";
import { updateFaqIconDto } from "../dto/update-icon";
import { updateFaqTitleDto } from "../dto/update-title.dto";

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

  findOneById = catchErrors(async (req, res) => {
    const { faqId } = req.params;
    const serviceResponse = await this.faqService.findOneById(faqId);
    return res.status(OK).json(serviceResponse);
  });

  updateTitle = catchErrors(async (req, res) => {
    const { faqId } = req.params;

    const payload = updateFaqTitleDto.parse(req.body);

    await this.faqService.updateTitle(faqId, payload);
    return res.sendStatus(NO_CONTENT);
  });

  updateDescription = catchErrors(async (req, res) => {
    const { faqId } = req.params;

    const payload = updateFaqDescriptionDto.parse(req.body);

    await this.faqService.updateDescription(faqId, payload);
    return res.sendStatus(NO_CONTENT);
  });

  updateIcon = catchErrors(async (req, res) => {
    const { faqId } = req.params;

    const payload = updateFaqIconDto.parse(req.body);

    await this.faqService.updateIcon(faqId, payload);
    return res.sendStatus(NO_CONTENT);
  });

  toggleStatus = catchErrors(async (req, res) => {
    const { faqId } = req.params;

    await this.faqService.toggleStatus(faqId);

    return res.sendStatus(NO_CONTENT);
  });
}
