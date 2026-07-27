import { CREATED, OK } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { WorkspaceService } from "../application/workspace.service";

export class WorkspaceController {
  private workspaceService;

  constructor(workspaceService: WorkspaceService) {
    this.workspaceService = workspaceService;
  }

  add = catchErrors(async (req, res) => {
    const payload = req.body;

    const userId = req.userId;
    await this.workspaceService.add(userId, payload);

    return res.sendStatus(CREATED);
  });

  find = catchErrors(async (req, res) => {
    const serviceResponse = await this.workspaceService.find();
    return res.status(OK).json(serviceResponse);
  });

  findOne = catchErrors(async (req, res) => {
    const { workspaceId } = req.params;
    const { userId } = req;
    const serviceResponse = await this.workspaceService.findOne(
      workspaceId,
      userId,
    );
    return res.status(OK).json(serviceResponse);
  });
}
