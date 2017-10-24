import { CvnPresenceIndicator } from "../";
import { Credit } from "./Credit";
import { ICardData } from "./Interfaces";

export class CreditCardData extends Credit implements ICardData {
  public static cardTypes = [
    { name: "Visa", regex: /^4/ },
    { name: "MasterCard", regex: /^(5[1-5]|2[2-7])/ },
    { name: "Amex", regex: /^3[47]/ },
    { name: "Diners", regex: /^3[0689]/ },
    { name: "EnRoute", regex: /^2(014|149)/ },
    { name: "Discover", regex: /^6([045]|22)/ },
    { name: "Jcb", regex: /^35/ },
  ];

  public number: string;
  public expMonth: string;
  public expYear: string;
  public cvn: string;
  public cvnPresenceIndicator: CvnPresenceIndicator;
  public cardHolderName: string;
  public cardPresent: boolean;
  public readerPresent: boolean;

  public constructor() {
    super();
    this.cardPresent = false;
    this.readerPresent = false;
    this.cvnPresenceIndicator = CvnPresenceIndicator.NotRequested;
  }

  public getCardType(): string {
    const number = this.number
      .replace(" ", "")
      .replace("-", "");

    for (const type of CreditCardData.cardTypes) {
      if (type.regex.test(number)) {
        return type.name;
      }
    }

    return "Unknown";
  }
}
