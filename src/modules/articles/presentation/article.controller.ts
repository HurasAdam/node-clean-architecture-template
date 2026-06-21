/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { CREATED } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { ArticleService } from "../application/article.service";
import { createArticleDto } from "../dto/create-article.dto";

export class ArticleController {
  private service;
  constructor(articleService: ArticleService) {
    this.service = articleService;
  }

  create = catchErrors(async ({ userId, body }, res) => {
    const payload = createArticleDto.parse(body);

    await this.service.create(userId, payload);
    return res.sendStatus(CREATED);
  });

  find = catchErrors(async (req, res) => {});

  findOne = catchErrors(async (req, res) => {});

  updateOne = catchErrors(async (req, res) => {});

  deleteOne = catchErrors(async (req, res) => {});
}
