export interface IWorkspaceMemberRepository {
  add: (payload: unknown, userId: string) => void;
}
