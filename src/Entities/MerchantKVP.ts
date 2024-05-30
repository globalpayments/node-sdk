export class MerchantKVP {
  private key: string;
  private value: string;
  private visible: boolean;

  getKey(): string {
    return this.key;
  }

  setKey(key: string): void {
    this.key = key;
  }

  getValue(): string {
    return this.value;
  }

  setValue(value: string): void {
    this.value = value;
  }

  isVisible(): boolean {
    return this.visible;
  }

  setVisible(visible: boolean): void {
    this.visible = visible;
  }
}
