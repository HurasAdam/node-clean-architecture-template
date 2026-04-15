import { SessionRepository } from "./session.repository";

export class SessionService {
  private repository;
  constructor(repository: SessionRepository) {
    this.repository = repository;
  }

  async find(){
    return await this.repository.find()
  }
  async deleteOne(sessionId:string){
await this.repository.deleteOne(sessionId);
  }
}
