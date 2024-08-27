import { DccProcessor } from "./Enums/DccProcessor";
import { DccRateType } from "./Enums/DccRateType";

export class DccRateData {
  /**
   * The amount
   */
  cardHolderAmount: number | string | null;

  /**
   * The currency
   */
  cardHolderCurrency: string;

  /**
   * The name of the CCP (Currency Conversion Processor) the request is to be sent to
   */
  dccProcessor: DccProcessor;

  /**
   * Rate Offered for the Exchange
   */
  cardHolderRate: string;

  /**
   * Rate type, 'S' for authorisation transactions (Sale). 'R' for Refunds.
   */
  dccRateType: DccRateType;

  /**
   * The type of currency conversion rate obtained. This is usually set to 1 but can contain other values.
   * Please consult with your Currency Conversion Processor.
   */
  dccType: string;

  /**
   * The orderId
   */
  orderId: string;

  /**
   * The DCC ID
   */
  dccId: string;

  /**
   * Commission Percentage
   */
  commissionPercentage: string;

  /**
   * Exchange Rate Source Name
   */
  exchangeRateSourceName: string;

  /**
   * Exchange Rate Source Timestamp
   */
  exchangeRateSourceTimestamp: Date; // Assuming Date is appropriate in TypeScript

  /**
   * The merchant amount
   */
  merchantAmount: number | string | null;

  /**
   * The merchant currency
   */
  merchantCurrency: string;

  /**
   * Margin Rate Percentage
   */
  marginRatePercentage: string;
}
