import catchErrors from "../../../utils/catchErrors";
import { createUserDto } from "../../users/dto/create-user.dto";
import { AdminService } from "../application/admin.service";

export class AdminController {
  private service: AdminService;
  constructor(service: AdminService) {
    this.service = service;
  }

  create = catchErrors(async ({ body }, res) => {
    const payload = createUserDto.parse(body);
    await this.service.create(payload);

    return res.sendStatus(201);
  });
}
