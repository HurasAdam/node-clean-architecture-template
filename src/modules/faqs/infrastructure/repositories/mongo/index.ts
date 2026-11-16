import { Model } from "mongoose";
import { FAqEntity } from "../../../domain/entity";
import { IFaqRepository } from "../../../domain/repository.interface";
import { AddFaqDto } from "../../../dto/add";
import { FaqListItemDto } from "../../../dto/find-list";
import { UpdateFaqDescriptionDto } from "../../../dto/update-description.dto";
import { UpdateFaqIconDto } from "../../../dto/update-icon";
import { UpdateFaqTitleDto } from "../../../dto/update-title.dto";
import { FaqDocument } from "../../models/mongo";

export class FaqRepository implements IFaqRepository {
  private model: Model<FaqDocument>;
  constructor(model: Model<FaqDocument>) {
    this.model = model;
  }

  toDomain(document: FaqDocument) {
    return new FAqEntity(
      document._id.toString(),
      document.title,
      document.description,
      document.status,
      document.iconKey,
      document.createdBy.toString(),
      document.createdAt,
    );
  }

  async add(currentUserId: string, payload: AddFaqDto) {
    await this.model.create({
      ...payload,
      createdBy: currentUserId,
    });
  }

  async findByTitle(title: string): Promise<FAqEntity | null> {
    const doc = await this.model.findOne({ title });
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async find(): Promise<FaqListItemDto[]> {
    const docs = await this.model
      .find()
      .select({ title: 1, status: 1, iconKey: 1 })
      .lean();

    return docs.map((doc) => ({
      id: doc._id.toString(),
      title: doc.title,
      status: doc.status,
      iconKey: doc.iconKey,
    }));
  }

  async findOneById(faqId: string) {
    const doc = await this.model.findById(faqId);
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async updateTitle(
    faqId: string,
    payload: UpdateFaqTitleDto,
  ): Promise<FAqEntity | null> {
    const doc = await this.model.findByIdAndUpdate(
      faqId,
      {
        $set: {
          title: payload.title,
        },
      },
      { new: true, runValidators: true },
    );

    return doc ? this.toDomain(doc) : null;
  }

  async updateDescription(
    faqId: string,
    payload: UpdateFaqDescriptionDto,
  ): Promise<FAqEntity | null> {
    const doc = await this.model.findByIdAndUpdate(
      faqId,
      {
        $set: {
          description: payload.description,
        },
      },
      { new: true, runValidators: true },
    );
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async updateIcon(
    faqId: string,
    payload: UpdateFaqIconDto,
  ): Promise<FAqEntity | null> {
    const doc = await this.model.findByIdAndUpdate(
      faqId,
      {
        $set: {
          iconKey: payload.iconKey,
        },
      },
      { new: true, runValidators: true },
    );
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async updateStatus(
    faqId: string,
    status: "PUBLIC" | "UNPUBLIC",
  ): Promise<FAqEntity | null> {
    const doc = await this.model.findByIdAndUpdate(
      faqId,
      {
        $set: {
          status,
        },
      },
      { new: true, runValidators: true },
    );

    return doc ? this.toDomain(doc) : null;
  }
}
