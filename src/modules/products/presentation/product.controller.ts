/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { NO_CONTENT, OK } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { ProductService } from "../application/product.service";
import { createProductDto } from "../dto/create-product.dto";

export class ProductController {
  private productService;
  constructor(productService: ProductService) {
    this.productService = productService;
  }

  create = catchErrors(async ({ body }, res) => {
    const payload = createProductDto.parse(body);
    await this.productService.create(payload);
    return res.sendStatus(NO_CONTENT);
  });

  find = catchErrors(async (req, res) => {
    const products = await this.productService.find();
    return res.status(OK).json(products);
  });
  findOne = catchErrors(async ({ params }, res) => {
    const { id } = params;
    const product = await this.productService.findOne(id);
    return res.status(OK).json(product);
  });
}
