import {
  AccountType,
  CheckType,
  ECheck,
  EntryMethod,
  SecCode,
} from "../../src";

export class TestChecks {
  public static certification(
    secCode = SecCode.PPD,
    checkType = CheckType.Personal,
    accountType = AccountType.Checking,
    checkName?: string,
  ) {
    const check = new ECheck();
    check.accountNumber = "24413815";
    check.routingNumber = "490000018";
    check.checkType = checkType;
    check.accountType = accountType;
    check.secCode = secCode;
    check.entryMode = EntryMethod.Manual;
    check.checkHolderName = "John Doe";
    check.driversLicenseNumber = "09876543210";
    check.driversLicenseState = "TX";
    check.phoneNumber = "8003214567";
    check.birthYear = "1997";
    check.ssnLast4 = "4321";
    if (checkName) {
      check.checkName = checkName;
    }
    return check;
  }
}
