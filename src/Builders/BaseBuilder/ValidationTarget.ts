import { ValidationClause } from "./ValidationClause";
import { Validations } from "./Validations";

export class ValidationTarget {
  public parent: Validations;
  public type: number;
  public property: string;
  public clause: ValidationClause;
  public constraint: number;
  public constraintProperty: string;
  public enumName: string;
  public precondition: ValidationClause;

  public constructor(parent: Validations, enumName: string, type: number) {
    this.parent = parent;
    this.type = type;
    this.enumName = enumName;
  }

  public with(property: string, constraint: number) {
    this.constraintProperty = property;
    this.constraint = constraint;
    return this;
  }

  public check(targetProperty: string): ValidationClause {
    this.property = targetProperty;
    this.clause = new ValidationClause(this.parent, this);
    return this.clause;
  }

  public when(targetProperty: string): ValidationClause {
    this.property = targetProperty;
    this.precondition = new ValidationClause(this.parent, this, true);
    return this.precondition;
  }
}
