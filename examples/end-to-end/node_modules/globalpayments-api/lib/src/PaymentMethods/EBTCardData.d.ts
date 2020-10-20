import { CvnPresenceIndicator } from "../";
import { EBT } from "./EBT";
import { ICardData } from "./Interfaces";
export declare class EBTCardData extends EBT implements ICardData {
    approvalCode: string;
    number: string;
    expMonth: string;
    expYear: string;
    cvn: string;
    cvnPresenceIndicator: CvnPresenceIndicator;
    cardHolderName: string;
    cardPresent: boolean;
    readerPresent: boolean;
    serialNumber: string;
    constructor();
}
