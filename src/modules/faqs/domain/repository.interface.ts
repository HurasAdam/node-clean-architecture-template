import { AddFaqDto } from "../dto/add";
import { FaqListItemDto } from "../dto/find-list";
import { UpdateFaqDescriptionDto } from "../dto/update-description.dto";
import { UpdateFaqIconDto } from "../dto/update-icon";
import { UpdateFaqTitleDto } from "../dto/update-title.dto";
import { FAqEntity } from "./entity";

export interface IFaqRepository {
  add: (currentUserId: string, payload: AddFaqDto) => Promise<any>;

  findByTitle(title: string): Promise<FAqEntity | null>;

  find(): Promise<FaqListItemDto[]>;

  findOneById: (faqId: string) => Promise<FAqEntity | null>;

  updateTitle(
    faqId: string,
    payload: UpdateFaqTitleDto,
  ): Promise<FAqEntity | null>;

  updateDescription: (
    faqId: string,
    payload: UpdateFaqDescriptionDto,
  ) => Promise<FAqEntity | null>;

  updateIcon: (
    faqId: string,
    payload: UpdateFaqIconDto,
  ) => Promise<FAqEntity | null>;

  updateStatus(
    faqId: string,
    status: "PUBLIC" | "UNPUBLIC",
  ): Promise<FAqEntity | null>;
}
