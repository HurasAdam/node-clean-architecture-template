export type ImportantMarker = "star" | "pin" | "warning";

export type ArticleReviewStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "REQUIRES_REVERIFICATION"
  | "APPROVED"
  | "REJECTED";

export type ArticlePublicationStatus = "UNPUBLISHED" | "PUBLISHED" | "ARCHIVED";

export class ArticleEntity {
  public id: string;
  public title: string;
  public reviewStatus: ArticleReviewStatus;
  public publicationStatus: ArticlePublicationStatus;
  public importantMarker: ImportantMarker | null;
  public internalNote: string;
  public product: string;
  public category: string;
  public tags: string[];
  public createdBy: string;
  public verifiedBy: string | null;
  public createdAt: Date;
  public firstApprovedAt: Date | null;

  constructor(
    id: string,
    title: string,
    reviewStatus: ArticleReviewStatus,
    publicationStatus: ArticlePublicationStatus,
    internalNote: string,
    importantMarker: ImportantMarker | null,
    product: string,
    category: string,
    tags: string[],
    createdBy: string,
    verifiedBy: string | null,
    createdAt: Date,
    firstApprovedAt: Date | null,
  ) {
    this.id = id;
    this.title = title;
    this.reviewStatus = reviewStatus;
    this.publicationStatus = publicationStatus;
    this.internalNote = internalNote;
    this.importantMarker = importantMarker;
    this.product = product;
    this.category = category;
    this.tags = tags;
    this.createdBy = createdBy;
    this.verifiedBy = verifiedBy;
    this.createdAt = createdAt;
    this.firstApprovedAt = firstApprovedAt;
  }
}
