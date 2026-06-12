import { IUsefullLinkCategoryRepository } from "../domain/usefullLinkCategory.repository.interface";

export class usefullLinkCategoryService {
  private usefullLinkCategoryRepository: IUsefullLinkCategoryRepository;

  constructor(usefullLinkCategoryRepository: IUsefullLinkCategoryRepository) {
    this.usefullLinkCategoryRepository = usefullLinkCategoryRepository;
  }

  async create(userId: string, payload: any) {
    return this.usefullLinkCategoryRepository.create(userId, payload);
  }

  find() {
    return this.usefullLinkCategoryRepository.find();
  }
}
