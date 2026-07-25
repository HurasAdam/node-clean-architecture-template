export class WorkspaceMemberService {
  private workspaceMemberRepository;

  constructor(workspaceMemberRepository) {
    this.workspaceMemberRepository = workspaceMemberRepository;
  }

  add(payload, userId) {
    return this.workspaceMemberRepository.add(payload, userId);
  }
}
