import { Validations } from "./BaseBuilder/Validations";
export declare abstract class BaseBuilder<T> {
    protected validations: Validations;
    [key: string]: any;
    constructor();
    execute(): Promise<T | undefined>;
    protected abstract setupValidations(): void;
}
