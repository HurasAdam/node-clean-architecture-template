/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import AppErrorCode from "../../../constants/appErrorCode";
import { CONFLICT, NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IArticleRepository } from "../../articles/domain/article.repository.interface";
import { IUserRepository } from "../../users/domain/user.repository.interface";
import { ITagRepository } from "../domain/tag.repository.interface";
import { CreateTagDto } from "../dto/create-tag.dto";
import { FindTagsQueryDto } from "../dto/find-tags-query.dto";
import { TagResponseDto } from "../dto/tag-response.dto";
import { UpdateTagDto } from "../dto/update-tag.dto";

export class TagService {
  private tagRepository: ITagRepository;
  private articleRepository: IArticleRepository;
  private userRepository: IUserRepository;
  constructor(
    tagRepository: ITagRepository,
    articleRepository: IArticleRepository,
    userRepository: IUserRepository,
  ) {
    this.tagRepository = tagRepository;
    this.articleRepository = articleRepository;
    this.userRepository = userRepository;
  }

  async create(userId: string, data: CreateTagDto) {
    const alreadyExist = await this.tagRepository.findByName(data.name);
    appAssert(!alreadyExist, CONFLICT, "Tag with that name already exists");
    return this.tagRepository.create(userId, data);
  }

  async find(query: FindTagsQueryDto): Promise<{ id: string; name: string }[]> {
    const tags = await this.tagRepository.find(query);

    return tags.map((tag) => {
      return {
        id: tag.id,
        name: tag.name,
      };
    });
  }

  async findWithDetails(query: FindTagsQueryDto): Promise<TagResponseDto[]> {
    const tags = await this.tagRepository.find(query);

    const userIds = [...new Set(tags.map((t) => t.createdBy))];

    const users = await this.userRepository.findByIds(userIds);

    const userMap = new Map(users.map((u) => [u.id, u]));

    return tags.map((tag) => {
      const user = userMap.get(tag.createdBy.toString());

      return {
        id: tag.id,
        name: tag.name,
        createdBy: user
          ? {
              id: user.id,
              name: user.name,
              surname: user.surname,
              email: user.email,
            }
          : null,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt,
      };
    });
  }

  async findOne(id: string) {
    const tag = await this.tagRepository.findOne(id);
    appAssert(tag, NOT_FOUND, "Tag not found");
    return tag;
  }

  async updateOne(id: string, userId: string, data: UpdateTagDto) {
    const tag = await this.tagRepository.findOne(id);
    appAssert(tag, NOT_FOUND, "Tag not found");

    if (data.name) {
      const existingTag = await this.tagRepository.findByName(data.name);
      appAssert(
        !existingTag || existingTag.id === tag.id,
        CONFLICT,
        "Tag name already exists",
      );
    }

    this.tagRepository.updateOne(id, data);
  }

  async deleteOne(id: string) {
    const tag = await this.tagRepository.deleteOne(id);

    appAssert(tag, NOT_FOUND, "Tag not found", AppErrorCode.NotFound);

    return;
  }
}
