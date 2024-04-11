import { LodgingItems } from ".";

export class LodgingData {
  prestigiousPropertyLimit: string;
  noShow: boolean;
  advancedDepositType: string;
  lodgingDataEdit: string;
  preferredCustomer: boolean;
  bookingReference: string;
  durationDays: number;
  checkedInDate: string;
  checkedOutDate: string;
  dailyRateAmount: string;
  items: LodgingItems[] = [];
}
