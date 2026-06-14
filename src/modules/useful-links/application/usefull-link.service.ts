import { IUsefullLinkCategoryRepository } from "../../useful-link-categories/domain/usefullLinkCategory.repository.interface";
import { IUsefullLinkRepository } from "../domain/usefullLink.repository.interface";

export class UsefullLinkService {
  private usefullLinkRepository: IUsefullLinkRepository;
  private usefullLinkCategoryRepository: IUsefullLinkCategoryRepository;

  constructor(
    usefullLinkRepository: IUsefullLinkRepository,
    usefullLinkCategoryRepository: IUsefullLinkCategoryRepository,
  ) {
    this.usefullLinkRepository = usefullLinkRepository;
    this.usefullLinkCategoryRepository = usefullLinkCategoryRepository;
  }

  async create(userId: string, payload: unknown) {
    return this.usefullLinkRepository.create(userId, payload);
  }

  find() {
    return this.usefullLinkRepository.find();
  }

  async findWithCategory() {
    const links = await this.usefullLinkRepository.find();

    const categoryIds = [...new Set(links.map((l) => l.linkCategory))];

    const categories =
      await this.usefullLinkCategoryRepository.findByIds(categoryIds);

    const categoryMap = new Map(categories.map((c) => [c.id, c]));

    return links.map((link) => {
      const category = categoryMap.get(link.linkCategory);

      return {
        ...link,
        category: category
          ? {
              id: category.id,
              name: category.name,
              order: category.order,
            }
          : null,
      };
    });
  }

  findOne(id: string) {
    return this.usefullLinkRepository.findOne(id);
  }
}
