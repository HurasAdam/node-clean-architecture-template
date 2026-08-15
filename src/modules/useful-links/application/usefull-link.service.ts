import { NOT_FOUND } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IUsefullLinkCategoryRepository } from "../../useful-link-categories/domain/usefullLinkCategory.repository.interface";
import { IUserRepository } from "../../users/domain/user.repository.interface";
import { IUsefullLinkRepository } from "../domain/usefullLink.repository.interface";

export class UsefullLinkService {
  private usefullLinkRepository: IUsefullLinkRepository;
  private usefullLinkCategoryRepository: IUsefullLinkCategoryRepository;
  private userRepository: IUserRepository;
  constructor(
    usefullLinkRepository: IUsefullLinkRepository,
    usefullLinkCategoryRepository: IUsefullLinkCategoryRepository,
    userRepository: IUserRepository,
  ) {
    this.usefullLinkRepository = usefullLinkRepository;
    this.usefullLinkCategoryRepository = usefullLinkCategoryRepository;
    this.userRepository = userRepository;
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
        id: link.id,
        name: link.name,
        url: link.url,
        isFeatured: link.isFeatured,
        description: link.description,
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

  async findOneWithDetails(id: string) {
    const link = await this.usefullLinkRepository.findOne(id);
    appAssert(link, NOT_FOUND, "Usefull link not found");
    const [category, user] = await Promise.all([
      this.usefullLinkCategoryRepository.findOne(link.linkCategory),
      this.userRepository.findOneById(link.createdBy),
    ]);

    return {
      ...link,
      createdBy: user
        ? {
            id: user.id,
            name: user.name,
            surname: user.surname,
          }
        : null,
      category: category
        ? {
            id: category.id,
            name: category.name,
            order: category.order,
          }
        : null,
    };
  }
}
