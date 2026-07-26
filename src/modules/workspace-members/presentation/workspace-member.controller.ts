import { CREATED, OK } from "../../../constants/http";
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
    await this.workspaceMemberServicer.addMany(payload);
    return res.sendStatus(CREATED);
  });

  findByWorkspaceId = catchErrors(async (req, res) => {
    const { workspaceId } = req.params;
    const serviceResponse =
      await this.workspaceMemberServicer.findByWorkspaceId(workspaceId);
    return res.status(OK).json(serviceResponse);
  });
}
