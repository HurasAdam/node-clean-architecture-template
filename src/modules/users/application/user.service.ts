import { IUserRepository } from "../domain/user.repository.interface";
import { CreateUserDto } from "../dto/create-user.dto";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  create(data: CreateUserDto) {
    return this.userRepository.create({
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
    });
  }

  find() {
    return this.userRepository.find();
  }

  findOne(userId: string) {
    return this.userRepository.findOneById(userId);
  }
}
