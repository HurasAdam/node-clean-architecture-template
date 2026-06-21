/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { CREATED, NO_CONTENT, OK } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { ProductCategoryService } from "../application/product-category.service";
import { createProductCategoryDto } from "../dto/create-product-category.dto";
import { updateProductCategoryDto } from "../dto/update-product-category.dto";

export class ProductCategoryController {
  private service;
  constructor(service: ProductCategoryService) {
    this.service = service;
  }

  create = catchErrors(async ({ userId, body }, res) => {
    const payload = createProductCategoryDto.parse(body);
    await this.service.create(userId, payload);

    return res.sendStatus(CREATED);
  });

  find = catchErrors(async (req, res) => {
    const response = await this.service.find();

    return res.status(200).json(response);
  });

  findByProduct = catchErrors(async ({ params }, res) => {
    const { productId } = params;
    const serviceResponse = await this.service.findByProductId(productId);

    return res.status(OK).json(serviceResponse);
  });

  findOne = catchErrors(async ({ params }, res) => {
    const { id } = params;
    const response = await this.service.findOne(id);
    res.status(200).json(response);
  });

  updateOne = catchErrors(async ({ params, body }, res) => {
    const { id } = params;
    const payload = updateProductCategoryDto.parse(body);
    const response = await this.service.updateOne(id, payload);
    res.status(200).json(response);
  });

  deleteOne = catchErrors(async ({ params }, res) => {
    const { id } = params;
    await this.service.deleteOne(id);
    return res.sendStatus(NO_CONTENT);
  });
}
