import { CREATED, NO_CONTENT, OK } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { ProductTopicService } from "../application/product-topic.service";
import { createProductTopicDto } from "../dto/create-product-topic.dto";
import { updateProductTopicDto } from "../dto/update-product-topic.dto";

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

  find = catchErrors(async (req, res) => {
    const serviceResponse = await this.service.find();
    return res.status(OK).json(serviceResponse);
  });

  findOne = catchErrors(async ({ params }, res) => {
    const { id } = params;

    const serviceRespone = await this.service.findOne(id);
    return res.status(OK).json(serviceRespone);
  });

  updateOne = catchErrors(async ({ params, body }, res) => {
    const { id } = params;
    const payload = updateProductTopicDto.parse(body);

    await this.service.updateOne(id, payload);
    return res.sendStatus(NO_CONTENT);
  });

  deleteOne = catchErrors(async ({ params }, res) => {
    const { id } = params;

    await this.service.deleteOne(id);

    return res.sendStatus(NO_CONTENT);
  });
}
