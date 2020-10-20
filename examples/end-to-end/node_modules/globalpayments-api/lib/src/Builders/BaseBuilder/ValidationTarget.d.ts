import { ValidationClause } from "./ValidationClause";
import { Validations } from "./Validations";
export declare class ValidationTarget {
    parent: Validations;
    type: number;
    property: string;
    clause: ValidationClause;
    constraint: number;
    constraintProperty: string;
    enumName: string;
    precondition: ValidationClause;
    constructor(parent: Validations, enumName: string, type: number);
    with(property: string, constraint: number): this;
    check(targetProperty: string): ValidationClause;
    when(targetProperty: string): ValidationClause;
}
