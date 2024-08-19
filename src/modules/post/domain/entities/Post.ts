export class Post {
  private _id: string;
  private _title: string;
  private _content: string | null;
  private _isPublished: boolean;
  private _createdAt: Date;

  constructor(
    id: string,
    title: string,
    content: string | null,
    isPublished: boolean,
    createdAt: Date,
  ) {
    this._id = id;
    this._title = title;
    this._content = content;
    this._isPublished = isPublished;
    this._createdAt = createdAt;
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public get content(): string | null {
    return this._content;
  }

  public set content(content: string | null) {
    this._content = content;
  }

  public get isPublished(): boolean {
    return this._isPublished;
  }

  public set isPublished(isPublished: boolean) {
    this._isPublished = isPublished;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }
}
