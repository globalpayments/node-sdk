import { BaseBuilder } from "../";
import { Validations } from "./Validations";
import { ValidationTarget } from "./ValidationTarget";
export declare class ValidationClause {
    parent: Validations;
    target: ValidationTarget;
    callback: <T>(build: BaseBuilder<T>) => boolean;
    message: string;
    precondition: boolean;
    constructor(parent: Validations, target: ValidationTarget, precondition?: boolean);
    isNotNull(message?: string): ValidationTarget;
    isNull(message?: string): ValidationTarget;
    isNotEmpty(message?: string): ValidationTarget;
}
