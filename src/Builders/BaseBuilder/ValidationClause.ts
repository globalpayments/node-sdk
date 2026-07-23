import { BuilderError } from "../../Entities";
import { BaseBuilder } from "../";
import { Validations } from "./Validations";
import { ValidationTarget } from "./ValidationTarget";

export class ValidationClause {
  public parent: Validations;
  public target: ValidationTarget;
  public callback?: <T>(build: BaseBuilder<T>) => boolean;
  public message?: string;
  public precondition: boolean;
  public property: string;

  public constructor(
    parent: Validations,
    target: ValidationTarget,
    precondition = false,
  ) {
    this.parent = parent;
    this.target = target;
    this.precondition = precondition;
    this.property = target.property;
  }

  public isNotNull(message?: string): ValidationTarget {
    const property = this.property;
    this.callback = <T>(builder: BaseBuilder<T>) => {
      let value = builder[property];
      if (property.includes(".")) {
        const keys = property.split(".");
        for (const key of keys) {
          value = value ? value[key] : builder[key];
        }
      }
      return undefined !== value && null !== value;
    };
    this.message = message
      ? message
      : `${property} cannot be null for this transaction type.`;

    if (this.precondition) {
      return this.target;
    }

    return this.parent
      .of(this.target.enumName, this.target.type)
      .with(this.target.constraintProperty, this.target.constraint);
  }

  public isNull(message?: string): ValidationTarget {
    const property = this.property;
    this.callback = <T>(builder: BaseBuilder<T>) => {
      const value = builder[property];
      return undefined === value || null === value;
    };
    this.message = message
      ? message
      : `${property} cannot be set for this transaction type.`;

    if (this.precondition) {
      return this.target;
    }

    return this.parent
      .of(this.target.enumName, this.target.type)
      .with(this.target.constraintProperty, this.target.constraint);
  }

  public isNotEmpty(message?: string): ValidationTarget {
    const property = this.property;
    this.callback = <T>(builder: BaseBuilder<T>) => {
      const value = builder[property];
      return !!value;
    };
    this.message = message
      ? message
      : `${property} cannot be empty for this transaction type.`;

    if (this.precondition) {
      return this.target;
    }

    return this.parent
      .of(this.target.enumName, this.target.type)
      .with(this.target.constraintProperty, this.target.constraint);
  }

  public isNotEqualTo(expected: unknown, message?: string): ValidationTarget {
    const property = this.property;
    this.callback = <T>(builder: BaseBuilder<T>) => {
      const value = builder[property];
      return expected !== value;
    };
    this.message = message
      ? message
      : `${property} cannot be ${expected} for this transaction type.`;

    if (this.precondition) {
      return this.target;
    }

    return this.parent
      .of(this.target.enumName, this.target.type)
      .with(this.target.constraintProperty, this.target.constraint);
  }

  public isEqualTo(expected: unknown, message?: string): ValidationTarget {
    const property = this.property;
    this.callback = <T>(builder: BaseBuilder<T>) => {
      const value = builder[property];
      return expected === value;
    };
    this.message = message
      ? message
      : `${property} cannot be different than ${expected} for this transaction type.`;

    if (this.precondition) {
      return this.target;
    }

    return this.parent
      .of(this.target.enumName, this.target.type)
      .with(this.target.constraintProperty, this.target.constraint);
  }

  isInstanceOf(clazz: any, message: string | null = null): ValidationTarget {
    const property = this.property;
    this.callback = (builder: any) => {
      // this will result in checking isInterfaceRequired (e.g paymentMethod.isSecure3d)
      if (!builder[property]["is" + clazz]) {
        throw new BuilderError(
          `${property} must be an instance of the ${clazz.name} class.`,
        );
      }
      return true;
    };

    this.message =
      message !== null
        ? message
        : `${property} must be an instance of the ${clazz.name} class.`;

    if (this.precondition) {
      return this.target;
    }

    return this.parent.of(this.target.enumName, this.target.type);
  }
}
