import { AddContactRecordDto } from "../dto/add";
import { ContactRecord } from "./entity";

export interface IContactRegistryRepository {
  add: (userId: string, payload: AddContactRecordDto) => Promise<ContactRecord>;
}
