import { Model } from "mongoose";
import { ContactRecord } from "../../../domain/entity";
import { IContactRegistryRepository } from "../../../domain/repository.interface";
import { AddContactRecordDto } from "../../../dto/add";
import { ContactRecordDocument } from "../../models/mongo";

export class ContactRegistryRepository implements IContactRegistryRepository {
  private model;

  constructor(model: Model<ContactRecordDocument>) {
    this.model = model;
  }

  private toDomain(document: ContactRecordDocument): ContactRecord {
    return new ContactRecord({
      id: document._id.toString(),
      userId: document.userId.toString(),
      topicId: document.topicId.toString(),
      type: document.type,
      note: document.note,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  async add(userId: string, payload: AddContactRecordDto) {
    const doc = await this.model.create({ userId, ...payload });

    return this.toDomain(doc);
  }
}
