import { CREATED } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { ContantRegistryService } from "../application/service";
import { addContactRecordDto } from "../dto/add";

export class ContactRegistryController {
  private contactRegistryService: ContantRegistryService;

  constructor(contactRegistryService: ContantRegistryService) {
    this.contactRegistryService = contactRegistryService;
  }

  add = catchErrors(async (req, res) => {
    const payload = addContactRecordDto.parse(req.body);
    const { userId } = req;
    await this.contactRegistryService.add(userId, payload);
    return res.sendStatus(CREATED);
  });
}
