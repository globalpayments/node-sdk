import { Validations } from "./BaseBuilder/Validations";

export interface IDictionary<T> {
  [key: string]: T;
}

export abstract class BaseBuilder<T> {
  protected validations: Validations;
  [key: string]: any;

  public constructor() {
    this.validations = new Validations();
    this.setupValidations();
  }

  public execute(): Promise<T | undefined> {
    this.validations.validate(this);
    return Promise.resolve(undefined);
  }

  protected abstract setupValidations(): void;
}
