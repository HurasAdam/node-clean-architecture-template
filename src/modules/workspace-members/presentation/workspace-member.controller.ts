import { CREATED } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { WorkspaceMemberService } from "../application/workspace-member.service";

export class WorkspaceMemberController {
  private workspaceMemberServicer: WorkspaceMemberService;

  constructor(workspaceMemberService: WorkspaceMemberService) {
    this.workspaceMemberServicer = workspaceMemberService;
  }

  add = catchErrors(async (req, res) => {
    const userId = req.userId;
    const payload = req.body;
    await this.workspaceMemberServicer.add(payload, userId);
    return res.sendStatus(CREATED);
  });
}
