import { Document } from "./Document";

export class DisputeDocument extends Document {
  public type: string;
  public b64_content: string;

  get b64Content(): string {
    return this.b64_content;
  }

  set b64Content(value: string) {
    this.b64_content = value;
  }
}
