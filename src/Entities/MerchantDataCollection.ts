import { MerchantKVP } from "./MerchantKVP";

export class MerchantDataCollection {
  private collection: MerchantKVP[];

  constructor() {
    this.collection = [];
  }

  add(key: string, value: string, visible: boolean = true): void {
    if (this.hasKey(key)) {
      if (visible) {
        throw new Error(`Key ${key} already exists in the collection.`);
      } else {
        const index = this.indexOf(key);
        if (index !== -1) {
          this.collection.splice(index, 1);
        }
      }
    }

    const kvp = new MerchantKVP();

    kvp.setKey(key);
    kvp.setValue(value);
    kvp.setVisible(visible);

    this.collection.push(kvp);
  }

  get(key: string): string | null {
    const kvp = this.collection.find(
      (item) => item.getKey() === key && item.isVisible(),
    );
    return kvp ? kvp.getValue() : null;
  }

  getKeys(): string[] {
    return this.collection
      .filter((item) => item.isVisible())
      .map((item) => item.getKey());
  }

  count(): number {
    return this.collection.filter((item) => item.isVisible()).length;
  }

  private indexOf(key: string): number {
    return this.collection.findIndex((item) => item.getKey() === key);
  }

  getHiddenValues(): MerchantKVP[] {
    return this.collection.filter((item) => !item.isVisible());
  }

  hasKey(key: string): boolean {
    return this.get(key) !== null;
  }

  mergeHidden(oldCollection: MerchantDataCollection): void {
    const hiddenValues = oldCollection.getHiddenValues();
    hiddenValues.forEach((kvp) => {
      if (!this.hasKey(kvp.getKey())) {
        this.collection.push(kvp);
      }
    });
  }

  static parse(
    kvpString: string,
    decoder: ((decoded: string) => string) | null = null,
  ): MerchantDataCollection {
    const collection = new MerchantDataCollection();

    let decryptedKvp = atob(kvpString);
    if (decoder) {
      decryptedKvp = decoder(decryptedKvp);
    }

    const merchantData = decryptedKvp.split("|");
    merchantData.forEach((kvp) => {
      const data = kvp.split(":");
      collection.add(data[0], data[1], data[2] === "true");
    });

    return collection;
  }

  toString(
    encoder: ((encoded: string) => string) | null = null,
  ): string | null {
    let sb = "";

    this.collection.forEach((kvp) => {
      sb += `${kvp.getKey()}:${kvp.getValue()}:${kvp.isVisible()}|`;
    });

    sb = sb.slice(0, -1);

    try {
      let formatted = sb;
      if (encoder) {
        formatted = encoder(sb);
      }
      return btoa(formatted);
    } catch (error) {
      return null;
    }
  }

  getValue(key: string, converter: ((value: any) => any) | null = null): any {
    for (const kvp of this.collection) {
      if (kvp.getKey() === key) {
        if (converter !== null) {
          return converter(kvp.getValue());
        } else {
          return kvp.getValue();
        }
      }
    }
    return null;
  }
}
