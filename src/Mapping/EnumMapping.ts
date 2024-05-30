import {
  AccountType,
  CardType,
  EmvLastChipRead,
  EncyptedMobileType,
  GatewayProvider,
  MessageCategory,
  SdkUiType,
  // ScheduleFrequency,
  StoredCredentialInitiator,
} from "../../src";

export class EnumMapping {
  static mapAccountType(
    gateway: GatewayProvider,
    accountType: AccountType,
  ): string | null {
    switch (gateway) {
      case GatewayProvider.GpApi:
        switch (accountType) {
          case AccountType.Savings:
            return "SAVING";
          case AccountType.Checking:
            return "CHECKING";
          case AccountType.Credit:
            return "CREDIT";
          default:
            return null;
        }

      default:
        return accountType;
    }
  }

  static mapDigitalWalletType(
    gateway: GatewayProvider,
    type: EncyptedMobileType,
  ): string | null {
    if (gateway === GatewayProvider.GpApi) {
      switch (type) {
        case EncyptedMobileType.ApplePay:
          return "APPLEPAY";
        case EncyptedMobileType.GooglePay:
          return "PAY_BY_GOOGLE";
        case EncyptedMobileType.ClickToPay:
          return "CLICK_TO_PAY";
        default:
          return null;
      }
    }
    return null;
  }

  static mapStoredCredentialInitiator(
    gateway: GatewayProvider,
    value: StoredCredentialInitiator,
  ): string {
    switch (gateway) {
      case GatewayProvider.GpApi:
        switch (value) {
          case StoredCredentialInitiator.CardHolder:
            return StoredCredentialInitiator.Payer.toUpperCase();
          case StoredCredentialInitiator.Merchant:
            return "MERCHANT";
          default:
            return value;
        }
      default:
        return value;
    }
  }

  static mapEmvLastChipRead(
    gateway: GatewayProvider,
    value: EmvLastChipRead,
  ): string | null {
    switch (gateway) {
      case GatewayProvider.GpApi:
        switch (value) {
          case EmvLastChipRead.SUCCESSFUL:
            return "PREV_SUCCESS";
          case EmvLastChipRead.FAILED:
            return "PREV_FAILED";
          default:
            return null;
        }
      default:
        return null;
    }
  }

  static mapCardType(gateway: GatewayProvider, value: string): string {
    switch (gateway) {
      case GatewayProvider.GpEcom:
      case GatewayProvider.GpApi:
        switch (value) {
          case "DinersClub":
            return CardType.DINERS;
          default:
            return value;
        }
      default:
        return value;
    }
  }

  static mapSdkUiType(
    gateway: GatewayProvider,
    value: SdkUiType[],
  ): string[] | SdkUiType[] {
    switch (gateway) {
      case GatewayProvider.GpApi:
        switch (value) {
          case [SdkUiType.Oob]:
            return ["OUT_OF_BAND"];
          default:
            return value;
        }
      default:
        return value;
    }
  }

  static mapMessageCategory(
    gateway: GatewayProvider,
    value: MessageCategory,
  ): string | MessageCategory {
    switch (gateway) {
      case GatewayProvider.GpApi:
        switch (value) {
          case MessageCategory.PaymentAuthentication:
            return "PAYMENT";
          default:
            return value;
        }
      default:
        return value;
    }
  }
}
