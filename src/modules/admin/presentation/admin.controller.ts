import { CREATED, NO_CONTENT, OK } from "../../../constants/http";
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

  findUserWithDetails = catchErrors(async ({ params }, res) => {
    const { id } = params;
    const serviceResponse = await this.service.findUserWithDetails(id);
    return res.status(OK).json(serviceResponse);
  });

  resetPassword = catchErrors(async ({ params }, res) => {
    const { id } = params;
    const serviceResponse = await this.service.resetPassword(id);
    return res.status(OK).json(serviceResponse);
  });

  updateUser = catchErrors(async ({ params, body }, res) => {
    const { id } = params;
    const { name, surname } = body;

    await this.service.updateUser(id, {
      name,
      surname,
    });
    return res.sendStatus(NO_CONTENT);
  });

  updateUserRole = catchErrors(async ({ params, body }, res) => {
    const { id } = params;
    const { roleId } = body;

    const serviceResponse = await this.service.updateUserRole(id, roleId);
    return res.sendStatus(CREATED);
  });
}
