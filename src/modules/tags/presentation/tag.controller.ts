/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { CREATED, NO_CONTENT } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { TagService } from "../application/tag.service";
import { createTagDto } from "../dto/create-tag.dto";
import { findTagsQueryDto } from "../dto/find-tags-query.dto";
import { updateTagDto } from "../dto/update-tag.dto";

export class TagController {
  private service;

  constructor(tagService: TagService) {
    this.service = tagService;
  }

  create = catchErrors(async ({ body, userId }, res) => {
    const payload = createTagDto.parse(body);

    await this.service.create(userId, payload);
    return res.sendStatus(CREATED);
  });

  find = catchErrors(async (req, res) => {
    const query = findTagsQueryDto.parse(req.query);

    const serviceResponse = await this.service.find(query);

    return res.status(200).json(serviceResponse);
  });

  findWithDetails = catchErrors(async (req, res) => {
    const query = findTagsQueryDto.parse(req.query);

    const serviceResponse = await this.service.findWithDetails(query);

    return res.status(200).json(serviceResponse);
  });

  findOne = catchErrors(async ({ params }, res) => {
    const { id } = params;
    const serviceResponse = await this.service.findOne(id);

    return res.status(200).json({
      id: serviceResponse.id,
      name: serviceResponse.name,
    });
  });

  updateOne = catchErrors(async ({ userId, body, params }, res) => {
    const { id } = params;
    const payload = updateTagDto.parse(body);
    await this.service.updateOne(id, userId, payload);
    return res.sendStatus(NO_CONTENT);
  });

  deleteOne = catchErrors(async ({ params }, res) => {
    const { id } = params;

    await this.service.deleteOne(id);
    return res.sendStatus(NO_CONTENT);
  });
}
