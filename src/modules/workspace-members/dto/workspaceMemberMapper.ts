import { User } from "../../users/domain/user.entity";

export interface WorkspaceMemberAvailableDto {
  id: string;
  name: string;
  surname: string;
  email: string;
}

export class WorkspaceMemberMapper {
  static toAvailableDto(user: User): WorkspaceMemberAvailableDto {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    };
  }

  static toAvailableListDto(users: User[]): WorkspaceMemberAvailableDto[] {
    return users.map((user) => this.toAvailableDto(user));
  }
}
