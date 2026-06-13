import { CONFLICT } from "../../../constants/http";
import appAssert from "../../../utils/appAssert";
import { IUsefullLinkCategoryRepository } from "../domain/usefullLinkCategory.repository.interface";

export class usefullLinkCategoryService {
  private usefullLinkCategoryRepository: IUsefullLinkCategoryRepository;

  constructor(usefullLinkCategoryRepository: IUsefullLinkCategoryRepository) {
    this.usefullLinkCategoryRepository = usefullLinkCategoryRepository;
  }

  async create(userId: string, payload: any) {
    const existing = await this.usefullLinkCategoryRepository.findByName(
      payload.name,
    );
    appAssert(!existing, CONFLICT, "A category with this name already exists");

    return this.usefullLinkCategoryRepository.create(userId, payload);
  }

  find() {
    return this.usefullLinkCategoryRepository.find();
  }
}
