import { ArticlePublicationStatus, ArticleReviewStatus } from "./entity";

export interface ArticleFindCriteria {
  publicationStatus: ArticlePublicationStatus;
  reviewStatuses?: ArticleReviewStatus[];
  excludedReviewStatuses?: ArticleReviewStatus[];
  lastVerifiedBefore?: Date;
}
