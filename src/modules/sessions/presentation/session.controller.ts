import catchErrors from "../../../utils/catchErrors";
import { SessionService } from "../application/session.service";

export class SessionController {
  private sessionService;
  constructor(sessionService: SessionService) {
    this.sessionService = sessionService;
  }

  find = catchErrors(async (req, res) => {
    const sessions = await this.sessionService.find();
    return res.status(200).json(sessions);
  });

  deleteOne = catchErrors(async ({ params }, res) => {
    const { sessionId } = params;
    await this.sessionService.deleteOne(sessionId);

    return res.sendStatus(201);
  });
}
