export type ImportantMarker = "star" | "pin" | "warning";

export type ArticleReviewStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "REQUIRES_REVERIFICATION"
  | "APPROVED"
  | "CHANGES_REQUESTED";

export type ArticlePublicationStatus = "UNPUBLISHED" | "PUBLISHED" | "ARCHIVED";

export class ArticleEntity {
  public id: string;
  public title: string;
  public internalNote: string;
  public publicationStatus: ArticlePublicationStatus;
  public reviewStatus: ArticleReviewStatus;
  public product: string;
  public category: string;
  public tags: string[];
  public importantMarker: ImportantMarker | null;
  public createdAt: Date;
  public createdBy: string;
  public verifiedBy: string | null;
  public lastVerifiedAt: Date | null;
  public changesRequestedBy: string | null;
  public changeRequestRecipient: string | null;
  public changeRequestNote: string | null;
  public lastUpdatedBy: string | null;
  public followers: string[];
  public updatedAt: Date | null;

  constructor(
    id: string,
    title: string,
    internalNote: string,
    publicationStatus: ArticlePublicationStatus,
    reviewStatus: ArticleReviewStatus,
    product: string,
    category: string,
    tags: string[],
    importantMarker: ImportantMarker | null,
    createdAt: Date,
    createdBy: string,
    verifiedBy: string | null,
    lastVerifiedAt: Date | null,
    changesRequestedBy: string | null,
    changeRequestRecipient: string | null,
    changeRequestNote: string | null,
    lastUpdatedBy: string | null,
    followers: string[],
    updatedAt: Date | null,
  ) {
    this.id = id;
    this.title = title;
    this.internalNote = internalNote;
    this.publicationStatus = publicationStatus;
    this.reviewStatus = reviewStatus;
    this.product = product;
    this.category = category;
    this.tags = tags;
    this.importantMarker = importantMarker;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.verifiedBy = verifiedBy;
    this.lastVerifiedAt = lastVerifiedAt;
    this.changesRequestedBy = changesRequestedBy;
    this.changeRequestRecipient = changeRequestRecipient;
    this.changeRequestNote = changeRequestNote;
    this.lastUpdatedBy = lastUpdatedBy;
    this.followers = followers;
    this.updatedAt = updatedAt;
  }
}
