export class MaskedValueCollection {
  protected maskValues: { [key: string]: string } = {};

  private getValues(): { [key: string]: string } {
    return this.maskValues;
  }

  public hideValue(
    key: string,
    value: string | null,
    unmaskedLastChars: number = 0,
    unmaskedFirstChars: number = 0,
  ): { [key: string]: string } {
    this.addValue(key, value, unmaskedLastChars, unmaskedFirstChars);

    return this.getValues();
  }

  protected addValue(
    key: string,
    value: string | null,
    unmaskedLastChars: number = 0,
    unmaskedFirstChars: number = 0,
  ): boolean {
    if (!this.validateValue(value) || this.maskValues[key] === value) {
      return false;
    }
    this.maskValues[key] = this.disguise(
      value,
      unmaskedLastChars,
      unmaskedFirstChars,
    );

    return true;
  }

  protected validateValue(value: string | null): boolean {
    if (!value || Array.isArray(value) || typeof value === "object") {
      return false;
    }

    return true;
  }

  private disguise(
    value: string | null,
    unmaskedLastChars: number = 0,
    unmaskedFirstChars: number = 0,
    maskSymbol: string = "X",
  ): string {
    value = String(value);
    unmaskedLastChars = Math.abs(Math.floor(unmaskedLastChars));
    maskSymbol = String(maskSymbol);

    // not enough chars to unmask?
    if (unmaskedLastChars >= value.length) {
      unmaskedLastChars = 0;
    }

    // at least half must be masked?
    if (unmaskedLastChars > value.length / 2) {
      unmaskedLastChars = Math.round(unmaskedLastChars / 2);
    }

    // leading unmasked chars
    if (unmaskedLastChars < 0) {
      const unmasked = value.slice(0, unmaskedLastChars);
      return unmasked + maskSymbol.repeat(value.length - unmasked.length);
    }

    const unmaskedFirstValue = value.slice(0, unmaskedFirstChars);
    const unmaskedLastValue = unmaskedLastChars
      ? value.slice(-unmaskedLastChars)
      : "";

    return (
      unmaskedFirstValue +
      maskSymbol.repeat(value.length - unmaskedFirstChars - unmaskedLastChars) +
      unmaskedLastValue
    );
  }
}
