import { MaskedValueCollection } from "../../../src";

export class ProtectSensitiveData {
  private static hideValueCollection: MaskedValueCollection;

  public static hideValue(
    key: string,
    value: string | null,
    unmaskedLastChars: number = 0,
    unmaskedFirstChars: number = 0,
  ): { [key: string]: string } {
    return (
      this.hideValueCollection ??
      (this.hideValueCollection = new MaskedValueCollection())
    ).hideValue(key, value, unmaskedLastChars, unmaskedFirstChars);
  }

  public static hideValues(
    list: { [key: string]: string },
    unmaskedLastChars: number = 0,
    unmaskedFirstChars: number = 0,
  ): { [key: string]: string } {
    if (!this.hideValueCollection) {
      this.hideValueCollection = new MaskedValueCollection();
    }

    let maskedList: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(list)) {
      maskedList = this.hideValueCollection.hideValue(
        key,
        value,
        unmaskedLastChars,
        unmaskedFirstChars,
      );
    }

    return maskedList;
  }
}
