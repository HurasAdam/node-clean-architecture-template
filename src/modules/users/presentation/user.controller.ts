import { validateObjectIdParam } from "../../../common/dto/param-id.dto";
import catchErrors from "../../../utils/catchErrors";
import { UserService } from "../application/user.service";
import { createUserDto } from "../dto/create-user.dto";

export class UserController {
  private service;
  constructor(userService: UserService) {
    this.service = userService;
  }

  create = catchErrors(async ({ body }, res) => {
    const payload = createUserDto.parse(body);
    await this.service.create(payload);
    return res.sendStatus(201);
  });

  find = async (req, res) => {
    const users = await this.service.find();
    return res.status(200).json(users);
  };

  findOne = catchErrors(async ({ params }, res) => {
    const { userId } = validateObjectIdParam("userId").parse(params);
    const user = await this.service.findOne(userId);

    return res.status(200).json(user);
  });
}
