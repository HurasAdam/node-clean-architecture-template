import { ISessionRepository } from "../../domain/session.repository.interface";

export class SessionRepository implements ISessionRepository {
  private model;
  constructor(model: any) {
    this.model = model;
  }

  async create(userId: string) {
    return this.model.create({ userId });
  }

  find() {
    return this.model.find();
  }

  findOneById(sessionId: string) {
    return this.model.findById(sessionId);
  }

  deleteOne(sessionId: string) {
    return this.model.findByIdAndDelete(sessionId);
  }
}
