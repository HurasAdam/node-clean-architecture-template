export type ContactType = "phone" | "message";

export interface ContactRecordProps {
  id: string;
  userId: string;
  topicId: string;
  type: ContactType;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ContactRecord {
  public readonly id: string;
  public readonly userId: string;
  public readonly topicId: string;
  public readonly type: ContactType;
  public readonly note?: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(props: ContactRecordProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.topicId = props.topicId;
    this.type = props.type;
    this.note = props.note;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
