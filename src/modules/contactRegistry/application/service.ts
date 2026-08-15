import { IContactRegistryRepository } from "../domain/repository.interface";
import { AddContactRecordDto } from "../dto/add";

export class ContantRegistryService {
  private contactRegistryRepository: IContactRegistryRepository;

  constructor(contactRegistryRepository: IContactRegistryRepository) {
    this.contactRegistryRepository = contactRegistryRepository;
  }

  add(userId: string, payload: AddContactRecordDto) {
    return this.contactRegistryRepository.add(userId, payload);
  }
}
