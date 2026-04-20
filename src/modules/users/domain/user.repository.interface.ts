import { CreateUserDto } from "../dto/create-user.dto";

export interface IUserRepository {
  create(data: CreateUserDto): Promise<any>;
  find(): Promise<any>;
  findOneById(id: string): Promise<any>;
  findOneByEmail(email: string): Promise<any>;
  deleteOne(): any;
  findByEmailWithRole(email: string): Promise<any>;
}
