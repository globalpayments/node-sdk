import { DocumentCategory } from "./Enums/DocumentCategory";
import { FileType } from "./Enums/FileType";

export class Document {
  public id: string;
  public name: string;
  public status: string;
  public timeCreated: string;
  public format: FileType;
  public category: DocumentCategory;
}
