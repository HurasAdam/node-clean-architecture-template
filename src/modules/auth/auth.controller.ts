import catchErrors from "../../utils/catchErrors";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";

export class AuthController {
  private service;
  constructor(authService: AuthService) {
    this.service = authService;
  }

  login = catchErrors(async ({ body }, res) => {
    const payload: LoginUserDto = body;
    await this.service.login(payload);
    return res.status(200).json("USER HERE");
  });

  findMe = catchErrors(async (req, res) => {
    const user = await this.service.me("69d96c62486202e673deb59f");
    return res.status(200).json(user);
  });

  logout = catchErrors(async (req, res) => {});
}
