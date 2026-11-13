/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { CREATED, NO_CONTENT, OK } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { ArticleService } from "../application/article.service";
import { createArticleDto } from "../dto/create-article.dto";
import { findArticleDto } from "../dto/find-article.dto";
import { updateInternalNoteDto } from "../dto/update-internalNote.dto";
import { updateProductAndCategoryDto } from "../dto/update-productAndCategory.dto";
import { updateArticleTagsDto } from "../dto/update-tags.dto";
import { updateArticleTitleDto } from "../dto/update-title.dto";

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

  approveOne = catchErrors(async (req, res) => {
    const { articleId } = req.params;
    const { userId: currentUser } = req;

    await this.service.approveOne(articleId, currentUser);

    return res.sendStatus(OK);
  });

  verifyOne = catchErrors(async (req, res) => {
    const { articleId } = req.params;
    const { userId: currentUser } = req;

    await this.service.verifyOne(articleId, currentUser);

    return res.sendStatus(OK);
  });

  requestChanges = catchErrors(async (req, res) => {
    const { articleId } = req.params;
    const { userId: currentUser } = req;
    const payload = req.body;

    await this.service.requestChanges(articleId, payload, currentUser);
    return res.sendStatus(CREATED);
  });

  submitForReview = catchErrors(async (req, res) => {
    const { articleId } = req.params;
    const { userId: currentUser } = req;

    await this.service.submitForReview(articleId, currentUser);
    return res.sendStatus(OK);
  });

  updateTitle = catchErrors(async (req, res) => {
    const { articleId } = req.params;
    const { userId: currentUser } = req;
    const payload = updateArticleTitleDto.parse(req.body);

    await this.service.updateTitle(articleId, currentUser, payload);
    return res.sendStatus(NO_CONTENT);
  });

  updateInternalNote = catchErrors(async (req, res) => {
    const { articleId } = req.params;
    const { userId: currentUser } = req;
    const payload = updateInternalNoteDto.parse(req.body);

    await this.service.updateInternalNote(articleId, currentUser, payload);
    return res.sendStatus(NO_CONTENT);
  });

  updateProductAndCategory = catchErrors(async (req, res) => {
    const { articleId } = req.params;
    const { userId: currentUser } = req;
    const payload = updateProductAndCategoryDto.parse(req.body);

    await this.service.updateProductCategory(articleId, currentUser, payload);

    return res.sendStatus(NO_CONTENT);
  });

  updateTags = catchErrors(async (req, res) => {
    const { articleId } = req.params;
    const { userId: currentUser } = req;
    const payload = updateArticleTagsDto.parse(req.body);

    await this.service.updateTags(articleId, currentUser, payload);

    return res.sendStatus(NO_CONTENT);
  });

  find = catchErrors(async (req, res) => {
    const filters = findArticleDto.parse(req.query);
    const serviceResponse = await this.service.find(filters);
    return res.status(OK).json(serviceResponse);
  });

  findDraft = catchErrors(async (req, res) => {
    const filters = findArticleDto.parse(req.query);
    const serviceResponse = await this.service.findDraft(filters);
    return res.status(OK).json(serviceResponse);
  });
  findScheduledForReview = catchErrors(async (req, res) => {
    const filters = findArticleDto.parse(req.query);
    const serviceResponse = await this.service.findScheduledForReview(filters);
    return res.status(OK).json(serviceResponse);
  });

  findOne = catchErrors(async (req, res) => {
    const { articleId } = req.params;
    const serviceResponse = await this.service.findOne(articleId);
    return res.status(OK).json(serviceResponse);
  });

  updateOne = catchErrors(async (req, res) => {});

  deleteOne = catchErrors(async (req, res) => {});
}
