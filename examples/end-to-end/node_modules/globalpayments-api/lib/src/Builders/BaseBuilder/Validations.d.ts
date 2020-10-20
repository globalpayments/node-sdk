import { BaseBuilder } from "../../";
import { ValidationTarget } from "./ValidationTarget";
export interface IRuleSet {
    [key: string]: ValidationTarget[][];
}
export declare class Validations {
    rules: IRuleSet;
    constructor();
    of(enumProperty: string, type: number): ValidationTarget;
    validate<T>(builder: BaseBuilder<T>): void;
}
