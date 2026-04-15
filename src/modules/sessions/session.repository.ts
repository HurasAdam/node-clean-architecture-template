export class SessionRepository {
  private model;
  constructor(model: any) {
    this.model = model;
  }

  find(){
    return this.model.find();
  };
  deleteOne(sessionId:string){
    return this.model.findByIdAndDelete(sessionId);
  };
}
