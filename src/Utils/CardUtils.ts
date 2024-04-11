import { Card } from "../../src/Entities/GpApi/DTO";
import {
  ProtectSensitiveData,
  CvnPresenceIndicator,
  EnumMapping,
  TransactionType,
  AuthorizationBuilder,
  CreditCardData,
  PaymentMethod,
  TrackNumber,
  CreditTrackData,
  DebitTrackData,
  PaymentMethodType,
} from "../../src";

export class CardUtils {
  private static trackOnePattern =
    /%?[B0]?([\d]+)\\^[^\\^]+\\^([\\d]{4})([^?]+)?/;
  private static trackTwoPattern = /;?([\d]+)=([\d]{4})([^?]+)?/;

  private static fleetBinMap: { [key: string]: [string, string][] } = {
    Visa: [
      ["448460", "448611"],
      ["448613", "448615"],
      ["448617", "448674"],
      ["448676", "448686"],
      ["448688", "448699"],
      ["461400", "461421"],
      ["461423", "461499"],
      ["480700", "480899"],
    ],
    MC: [
      ["553231", "553380"],
      ["556083", "556099"],
      ["556100", "556599"],
      ["556700", "556999"],
    ],
    Wex: [
      ["690046", "690046"],
      ["707138", "707138"],
    ],
    Voyager: [["708885", "708889"]],
  };

  private static cardTypes: { [key: string]: RegExp } = {
    Visa: /^4/,
    MC: /^(?:5[1-6]|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)/,
    Amex: /^3[47]/,
    DinersClub: /^3(?:0[0-5]|[68][0-9])/,
    EnRoute: /^2(014|149)/,
    Discover: /^6(?:011|5[0-9]{2})/,
    Jcb: /^(?:2131|1800|35\d{3})/,
    Wex: /^(?:690046|707138)/,
    Voyager: /^70888[5-9]/,
  };

  public static generateCard(
    builder: AuthorizationBuilder,
    gatewayProvider: any,
    maskedValues: Record<string, string>,
  ) {
    const paymentMethod = builder.paymentMethod;
    const transactionType = builder.transactionType;

    const card = new Card();

    if (
      paymentMethod instanceof CreditTrackData ||
      paymentMethod instanceof DebitTrackData
    ) {
      card.track = paymentMethod.value;
      if (transactionType === TransactionType.Sale) {
        if (!card.track) {
          card.number = paymentMethod.pan;
          maskedValues = {
            ...maskedValues,
            ...ProtectSensitiveData.hideValue(
              "payment_method.card.number",
              paymentMethod.pan,
              4,
            ),
          };
          if (paymentMethod.expiry) {
            card.expiry_month = paymentMethod.expiry.substring(2, 4);
            card.expiry_year = paymentMethod.expiry.substring(0, 2);
            maskedValues = {
              ...maskedValues,
              ...ProtectSensitiveData.hideValues({
                "payment_method.card.expiry_month": card.expiry_month,
                "payment_method.card.expiry_year": card.expiry_year,
              }),
            };
          }
        }
        if (
          (builder.transactionType === TransactionType.Sale ||
            builder.transactionType === TransactionType.Refund) &&
          !builder.tagData
        ) {
          card.chip_condition = EnumMapping.mapEmvLastChipRead(
            gatewayProvider,
            builder.emvChipCondition,
          );
        }

        if (builder.transactionType === TransactionType.Sale) {
          card.funding =
            builder.paymentMethod.paymentMethodType === PaymentMethodType.Debit
              ? "DEBIT"
              : "CREDIT";
        }
      }
    } else if (builder.paymentMethod instanceof CreditCardData) {
      card.number = paymentMethod.number;
      maskedValues = {
        ...maskedValues,
        ...ProtectSensitiveData.hideValue(
          "payment_method.card.number",
          paymentMethod.number,
          4,
          6,
        ),
      };

      if (paymentMethod.expMonth) {
        card.expiry_month = paymentMethod.expMonth.toString().padStart(2, "0");
        maskedValues = {
          ...maskedValues,
          ...ProtectSensitiveData.hideValue(
            "payment_method.card.expiry_month",
            card.expiry_month,
          ),
        };
      }
      if (paymentMethod.expYear) {
        card.expiry_year = paymentMethod.expYear
          .toString()
          .padStart(4, "0")
          .substring(2, 4);
        maskedValues = {
          ...maskedValues,
          ...ProtectSensitiveData.hideValue(
            "payment_method.card.expiry_year",
            card.expiry_year,
          ),
        };
      }
      if (paymentMethod.cvn) {
        card.cvv = paymentMethod.cvn;
        maskedValues = {
          ...maskedValues,
          ...ProtectSensitiveData.hideValue(
            "payment_method.card.cvv",
            paymentMethod.cvn,
          ),
        };
        const cvnPresenceIndicator = paymentMethod.cvn
          ? CvnPresenceIndicator.Present
          : paymentMethod.cvnPresenceIndicator
          ? paymentMethod.cvnPresenceIndicator
          : "";
        card.cvv_indicator = CardUtils.getCvvIndicator(cvnPresenceIndicator);
      }
      if (builder.emvChipCondition && !builder.tagData) {
        card.chip_condition = EnumMapping.mapEmvLastChipRead(
          gatewayProvider,
          builder.emvChipCondition,
        );
      }
    }

    if (builder.paymentMethod.isPinProtected) {
      card.pin_block = builder.paymentMethod.pinBlock;
    }

    const billingAddress = builder.billingAddress
      ? builder.billingAddress.streetAddress1
      : undefined;
    const postalCode = builder.billingAddress
      ? builder.billingAddress.postalCode
      : undefined;
    card.tag = builder.tagData;
    card.avs_address = billingAddress;
    card.avs_postal_code = postalCode;
    card.authcode = builder.offlineAuthCode;

    maskedValues;

    return card;
  }

  public static getCvvIndicator(cvnPresenceIndicator: number): string {
    let cvvIndicator: string;
    switch (cvnPresenceIndicator) {
      case 1:
        cvvIndicator = "PRESENT";
        break;
      case 2:
        cvvIndicator = "ILLEGIBLE";
        break;
      case 3:
        cvvIndicator = "NOT_ON_CARD";
        break;
      default:
        cvvIndicator = "NOT_PRESENT";
        break;
    }

    return cvvIndicator;
  }

  static parseTrackData(paymentMethod: PaymentMethod): PaymentMethod {
    const trackData = paymentMethod.value;
    const trackTwoPattern: RegExp = new RegExp(CardUtils.trackTwoPattern);
    const trackOnePattern: RegExp = new RegExp(CardUtils.trackOnePattern);
    let matches: RegExpExecArray | null;

    matches = trackTwoPattern.exec(trackData);
    if (matches && matches[1] && matches[2]) {
      const pan: string = matches[1];
      const expiry: string = matches[2];
      let discretionary: string | null = matches[3] || null;

      if (discretionary) {
        if (
          (pan + expiry + discretionary).length === 37 &&
          discretionary.toLowerCase().endsWith("f")
        ) {
          discretionary = discretionary.substring(0, discretionary.length - 1);
        }

        paymentMethod.discretionaryData = discretionary;
      }

      paymentMethod.trackNumber = TrackNumber.TRACK_TWO;
      paymentMethod.pan = pan;
      paymentMethod.expiry = expiry;
      paymentMethod.trackData = `${pan}=${expiry}${discretionary}?`;
    } else {
      matches = trackOnePattern.exec(trackData);
      if (matches && matches[1] && matches[2]) {
        paymentMethod.trackNumber = TrackNumber.TRACK_ONE;
        paymentMethod.pan = matches[1];
        paymentMethod.expiry = matches[2];

        paymentMethod.trackData = matches[0].replace("%", "");
      }
    }

    return paymentMethod;
  }

  static getCardType(number: string): string {
    number = number.replace(/[ -]/g, "");

    let rvalue: string = "Unknown";
    for (const [type, regex] of Object.entries(CardUtils.cardTypes)) {
      if (regex.test(number)) {
        rvalue = type;
      }
    }
    if (rvalue !== "Unknown") {
      if (CardUtils.isFleet(rvalue, number)) {
        rvalue += "Fleet";
      }
    }

    return rvalue;
  }

  static isFleet(cardType: string, pan: string): boolean {
    if (pan !== "") {
      const compareValue: string = pan.substring(0, 6);
      const baseCardType: string = cardType.replace("Fleet", "");

      if (CardUtils.fleetBinMap[baseCardType]) {
        const binRanges: [string, string][] =
          CardUtils.fleetBinMap[baseCardType];
        for (const [lowerRange, upperRange] of binRanges) {
          if (compareValue >= lowerRange && compareValue <= upperRange) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
