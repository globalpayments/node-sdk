import { BaseBuilder, BuilderError, TransactionBuilder } from "../../";
import { ValidationTarget } from "./ValidationTarget";

export interface IRuleSet {
  [key: string]: {
    [key: string]: ValidationTarget[];
  };
}

export class Validations {
  public rules: IRuleSet;

  public constructor() {
    this.rules = {};
  }

  public of(enumProperty: string, type: number): ValidationTarget {
    if (!this.rules.hasOwnProperty(enumProperty)) {
      this.rules[enumProperty] = {};
    }

    if (!this.rules[enumProperty].hasOwnProperty(type.toString())) {
      this.rules[enumProperty][type.toString()] = [];
    }

    const target = new ValidationTarget(this, enumProperty, type);
    this.rules[enumProperty][type].push(target);
    return target;
  }

  public validate<T>(builder: BaseBuilder<T>): void {
    Object.keys(this.rules).forEach((enumName) => {
      Object.keys(this.rules[enumName]).forEach((ruleType) => {
        let value: number = builder[enumName];

        if (
          (value === undefined || value === null) &&
          builder instanceof TransactionBuilder &&
          builder.paymentMethod
        ) {
          value = builder.paymentMethod[enumName];
          if (value === undefined || value === null) {
            return;
          }
        }

        if ((Number(ruleType) & value) !== value || Number(ruleType) > value) {
          return;
        }

        for (const validation of this.rules[enumName][ruleType]) {
          if (!validation.clause) {
            continue;
          }

          if (
            validation.constraint !== undefined &&
            validation.constraint !== null &&
            validation.constraint !== builder[validation.constraintProperty]
          ) {
            continue;
          }

          if (!validation.clause.callback(builder)) {
            throw new BuilderError(validation.clause.message);
          }
        }
      });
    });
  }
}
