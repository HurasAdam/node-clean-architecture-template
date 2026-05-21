import { CREATED } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { ProductTopicService } from "../application/product-topic.service";
import { createProductTopicDto } from "../dto/create-product-topic.dto";

export class ProductTopicController {
  private service;
  constructor(service: ProductTopicService) {
    this.service = service;
  }

  create = catchErrors(async ({ userId, body }, res) => {
    const payload = createProductTopicDto.parse(body);
    await this.service.create(userId, payload);
    return res.sendStatus(CREATED);
  });
}
