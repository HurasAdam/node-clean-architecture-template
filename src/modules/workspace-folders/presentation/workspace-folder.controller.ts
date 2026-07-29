import { CREATED } from "../../../constants/http";
import catchErrors from "../../../utils/catchErrors";
import { WorkspaceFolderService } from "../application/workspace-folder.service";

export class WorkspaceFolderController {
  private workspaceFolderService;

  constructor(workspaceFolderService: WorkspaceFolderService) {
    this.workspaceFolderService = workspaceFolderService;
  }

  add = catchErrors(async (req, res) => {
    const payload = req.body;
    const { userId } = req;

    await this.workspaceFolderService.add(userId, payload);
    return res.sendStatus(CREATED);
  });
}
