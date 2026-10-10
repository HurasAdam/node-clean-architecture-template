export type ImportantMarker = "star" | "pin" | "warning";

export class ArticleEntity {
  public id: string;
  public title: string;
  public status: string;
  public importantMarker: ImportantMarker | null;
  public internalNote: string;
  public product: string;
  public category: string;
  public tags: string[];

  constructor(
    id: string,
    title: string,
    status: string,
    internalNote: string,
    importantMarker: ImportantMarker | null,
    product: string,
    category: string,
    tags: string[],
  ) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.internalNote = internalNote;
    this.importantMarker = importantMarker;
    this.product = product;
    this.category = category;
    this.tags = tags;
  }
}
