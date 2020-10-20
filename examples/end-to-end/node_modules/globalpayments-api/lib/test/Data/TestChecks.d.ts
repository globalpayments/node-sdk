import { AccountType, CheckType, ECheck, SecCode } from "../../src";
export declare class TestChecks {
    static certification(secCode?: SecCode, checkType?: CheckType, accountType?: AccountType, checkName?: string): ECheck;
}
