import { FaqStatus } from "../infrastructure/models/mongo";

export interface FaqDetailsDto {
  id: string;
  title: string;
  description: string;
  status: FaqStatus;
  iconKey: string;
  questionsCount: number;
  createdAt: Date;
  createdBy: {
    id: string;
    name: string;
    surname: string;
    email: string;
  };
}
