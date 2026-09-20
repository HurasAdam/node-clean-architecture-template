/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { CREATED, OK } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { ArticleService } from "../application/article.service";
import { createArticleDto } from "../dto/create-article.dto";

export class ArticleController {
  private service;
  constructor(articleService: ArticleService) {
    this.service = articleService;
  }

  create = catchErrors(async (req, res) => {
    const payload = createArticleDto.parse(req.body);
    const { userId: currentUser } = req;
    await this.service.create(currentUser, payload);
    return res.sendStatus(CREATED);
  });

  find = catchErrors(async (req, res) => {
    const serviceResponse = await this.service.find();
    return res.status(OK).json(serviceResponse);
  });

  findOne = catchErrors(async (req, res) => {});

  updateOne = catchErrors(async (req, res) => {});

  deleteOne = catchErrors(async (req, res) => {});
}
