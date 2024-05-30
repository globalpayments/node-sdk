import { BuilderError } from "../../Entities";
import { BaseBuilder } from "../";
import { Validations } from "./Validations";
import { ValidationTarget } from "./ValidationTarget";

export class ValidationClause {
  public parent: Validations;
  public target: ValidationTarget;
  public callback: <T>(build: BaseBuilder<T>) => boolean;
  public message: string;
  public precondition: boolean;

  public constructor(
    parent: Validations,
    target: ValidationTarget,
    precondition = false,
  ) {
    this.parent = parent;
    this.target = target;
    this.precondition = precondition;
  }

  public isNotNull(message?: string): ValidationTarget {
    this.callback = <T>(builder: BaseBuilder<T>) => {
      let value = builder[this.target.property];
      if (this.target.property.includes(".")) {
        const keys = this.target.property.split(".");
        for (const key of keys) {
          value = value ? value[key] : builder[key];
        }
      }
      return undefined !== value && null !== value;
    };
    this.message = message
      ? message
      : `${this.target.property} cannot be null for this transaction type.`;

    if (this.precondition) {
      return this.target;
    }

    return this.parent
      .of(this.target.enumName, this.target.type)
      .with(this.target.constraintProperty, this.target.constraint);
  }

  public isNull(message?: string): ValidationTarget {
    this.callback = <T>(builder: BaseBuilder<T>) => {
      const value = builder[this.target.property];
      return undefined === value || null === value;
    };
    this.message = message
      ? message
      : `${this.target.property} cannot be set for this transaction type.`;

    if (this.precondition) {
      return this.target;
    }

    return this.parent
      .of(this.target.enumName, this.target.type)
      .with(this.target.constraintProperty, this.target.constraint);
  }

  public isNotEmpty(message?: string): ValidationTarget {
    this.callback = <T>(builder: BaseBuilder<T>) => {
      const value = builder[this.target.property];
      return !!value;
    };
    this.message = message
      ? message
      : `${this.target.property} cannot be empty for this transaction type.`;

    if (this.precondition) {
      return this.target;
    }

    return this.parent
      .of(this.target.enumName, this.target.type)
      .with(this.target.constraintProperty, this.target.constraint);
  }

  public isNotEqualTo(expected: unknown, message?: string): ValidationTarget {
    this.callback = <T>(builder: BaseBuilder<T>) => {
      const value = builder[this.target.property];
      return expected !== value;
    };
    this.message = message
      ? message
      : `${this.target.property} cannot be ${expected} for this transaction type.`;

    if (this.precondition) {
      return this.target;
    }

    return this.parent
      .of(this.target.enumName, this.target.type)
      .with(this.target.constraintProperty, this.target.constraint);
  }

  public isEqualTo(expected: unknown, message?: string): ValidationTarget {
    this.callback = <T>(builder: BaseBuilder<T>) => {
      const value = builder[this.target.property];
      return expected === value;
    };
    this.message = message
      ? message
      : `${this.target.property} cannot be different than ${expected} for this transaction type.`;

    if (this.precondition) {
      return this.target;
    }

    return this.parent
      .of(this.target.enumName, this.target.type)
      .with(this.target.constraintProperty, this.target.constraint);
  }

  isInstanceOf(clazz: any, message: string | null = null): ValidationTarget {
    this.callback = (builder: any) => {
      // this will result in checking isInterfaceRequired (e.g paymentMethod.isSecure3d)
      if (!builder[this.target.property]["is" + clazz]) {
        throw new BuilderError(
          `${this.target.property} must be an instance of the ${clazz.name} class.`,
        );
      }
      return true;
    };

    this.message =
      message !== null
        ? message
        : `${this.target.property} must be an instance of the ${clazz.name} class.`;

    if (this.precondition) {
      return this.target;
    }

    return this.parent.of(this.target.enumName, this.target.type);
  }
}
