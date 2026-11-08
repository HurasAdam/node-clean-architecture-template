import { z } from "zod";
import {
  ArticlePublicationStatus,
  ArticleReviewStatus,
  ImportantMarker,
} from "../domain/entity";

export const findArticleDto = z.object({
  search: z.string().trim().optional(),
  product: z.string().optional(),
  category: z.string().optional(),

  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
export type FindArticleDto = z.infer<typeof findArticleDto>;

export interface ArticleListItem {
  id: string;
  title: string;
  publicationStatus: ArticlePublicationStatus;
  reviewStatus: ArticleReviewStatus;
  product: {
    id: string;
    name: string;
  } | null;
  category: {
    id: string;
    name: string;
  } | null;
  tags: {
    id: string;
    name: string;
  }[];
  importantMarker: ImportantMarker | null;
  createdAt: Date;
  createdBy: string;
  verifiedBy: string | null;
  lastVerifiedAt: Date | null;
  updatedAt: Date | null;
  requiresReverification: boolean;
}
