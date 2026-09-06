import { CREATED, NO_CONTENT, OK } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { WorkspaceMemberService } from "../application/workspace-member.service";
import { updateWorkspaceMemberPermissionsDto } from "../dto/updatePermissions";

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

  transferOwnership = catchErrors(async (req, res) => {
    const { workspaceId, newOwnerId } = req.params;
    const { userId: currentUserId } = req;

    await this.workspaceMemberServicer.transferOwnership(
      workspaceId,
      currentUserId,
      newOwnerId,
    );

    return res.sendStatus(NO_CONTENT);
  });

  updatePermissions = catchErrors(async (req, res) => {
    const { workspaceId, memberId } = req.params;
    const { userId: currentUserId } = req;
    const { permissions } = updateWorkspaceMemberPermissionsDto.parse(req.body);

    await this.workspaceMemberServicer.updatePermissions(
      workspaceId,
      currentUserId,
      memberId,
      permissions,
    );
    return res.sendStatus(NO_CONTENT);
  });

  deleteOne = catchErrors(async (req, res) => {
    const { workspaceId, memberId } = req.params;
    const { userId: currentUserId } = req;

    await this.workspaceMemberServicer.deleteOne(
      workspaceId,
      currentUserId,
      memberId,
    );

    return res.sendStatus(NO_CONTENT);
  });
}
