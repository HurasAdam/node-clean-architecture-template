import { ContantRegistryService } from "./application/service";
import { IContactRegistryRepository } from "./domain/repository.interface";
import { ContactRegistryController } from "./presentation/controller";

interface Deps {
  contactRegistryRepository: IContactRegistryRepository;
}

export function createContactRegistryModule(deps: Deps) {
  const service = new ContantRegistryService(deps.contactRegistryRepository);
  const controller = new ContactRegistryController(service);

  return {
    controller,
  };
}
