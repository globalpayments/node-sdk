import { FraudFilterMode } from ".";

export class FraudRule {
  key: string;
  mode: FraudFilterMode;
  description: string;
  result: string;

  constructor(
    key: string,
    mode: FraudFilterMode,
    description: string,
    result: string,
  ) {
    this.key = key;
    this.mode = mode;
    this.description = description;
    this.result = result;
  }
}
