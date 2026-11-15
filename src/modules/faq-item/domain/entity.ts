export class FAqItemEntity {
  public id: string;
  public faqId: string;
  public question: string;
  public answer: string;
  public createdBy: string;
  public createdAt: Date;

  constructor(
    id: string,
    faqId: string,
    question: string,
    answer: string,
    createdBy: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.faqId = faqId;
    this.question = question;
    this.answer = answer;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
  }
}
