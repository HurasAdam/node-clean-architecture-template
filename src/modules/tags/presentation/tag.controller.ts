import { CREATED } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { TagService } from "../application/tag.service";

export class TagController {
  private service;

  constructor(tagService: TagService) {
    this.service = tagService;
  }

  create = catchErrors(async ({ body }, res) => {
    const payload = body;

    await this.service.create(payload);
    return res.sendStatus(CREATED);
  });
}
