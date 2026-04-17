import { SessionRepository } from "../sessions/session.repository";
import { UserRepository } from "../users/user.repository";
import { LoginUserDto } from "./dto/login-user.dto";

export class AuthService {
  private userRepository: UserRepository;
  private sessionRepository: SessionRepository;
  constructor(
    userRepository: UserRepository,
    sessionRepository: SessionRepository,
  ) {
    this.userRepository = userRepository;
    this.sessionRepository = sessionRepository;
  }

  async login(payload: LoginUserDto) {
    this.userRepository.findByEmailWithRole(payload.email);
  }

  async me(id: string) {
    const user = await this.userRepository.findOneById(id);
    return {
      id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    };
  }
}
