import { CREATED, NO_CONTENT, OK } from "../../../constants/http";
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

  findAllByWorkspace = catchErrors(async (req, res) => {
    const { workspaceId } = req.params;
    const serviceResponse =
      await this.workspaceFolderService.findAllByWorkspace(workspaceId);
    return res.status(OK).json(serviceResponse);
  });

  updateOne = catchErrors(async (req, res) => {
    const { folderId } = req.params;
    const payload = req.body;
    await this.workspaceFolderService.updateOne(folderId, payload);

    return res.sendStatus(NO_CONTENT);
  });

  deleteOne = catchErrors(async (req, res) => {
    const { folderId } = req.params;

    await this.workspaceFolderService.deleteOne(folderId);
    return res.sendStatus(NO_CONTENT);
  });
}
