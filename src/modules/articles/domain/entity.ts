export type ImportantMarker = "star" | "pin" | "warning";

export class ArticleEntity {
  public id: string;
  public title: string;
  public status: string;
  public importantMarker: ImportantMarker | null;
  public product: string;
  public category: string;

  constructor(
    id: string,
    title: string,
    status: string,
    importantMarker: ImportantMarker | null,
    product: string,
    category: string,
  ) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.importantMarker = importantMarker;
    this.product = product;
    this.category = category;
  }
}
