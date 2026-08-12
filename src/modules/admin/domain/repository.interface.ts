export interface IAdminRepository {
  findByLogin: (login: string) => Promise<unknown>;
}
