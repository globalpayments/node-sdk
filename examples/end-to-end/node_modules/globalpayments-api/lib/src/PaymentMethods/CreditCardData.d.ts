import { CvnPresenceIndicator } from "../";
import { Credit } from "./Credit";
import { ICardData } from "./Interfaces";
export declare class CreditCardData extends Credit implements ICardData {
    static cardTypes: {
        name: string;
        regex: RegExp;
    }[];
    number: string;
    expMonth: string;
    expYear: string;
    cvn: string;
    cvnPresenceIndicator: CvnPresenceIndicator;
    cardHolderName: string;
    cardPresent: boolean;
    readerPresent: boolean;
    constructor();
    getCardType(): string;
}
