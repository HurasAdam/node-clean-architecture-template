export class userController {
  private userService;
  constructor(userService) {
    this.userService = userService;
  }

  create(req, res) {
    console.log("QUERY", req.query);
    return res.status(200).json("AA");
  }
}
