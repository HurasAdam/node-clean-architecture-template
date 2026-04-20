export interface ISessionRepository {
  create(userId: string): Promise<any>;
  find(): Promise<any>;
  findOneById(sessionId: string): Promise<any>;
  deleteOne(sessionId: string): Promise<any>;
}
