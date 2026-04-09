import { userRepository } from "./user.repository";

export class userService {
  constructor(private userRepository: userRepository) {}

  findAll = () => {
    const users = this.userRepository.findAll();
    this.userRepository.deleteOne();
    return users;
  };
}
