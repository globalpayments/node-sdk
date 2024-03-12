import { Card } from ".";

export class PaymentMethod {
  id: any;
  entry_mode: any;
  authentication: any;
  encryption: any;
  name: any;
  storage_mode: any;
  card: Card | null;
  digital_wallet: any;
  bank_transfer: any;
  apm: any[];
  fingerprint_mode: any;
  narrative: any;
  bnpl: any;

  static PAYMENT_METHOD_TOKEN_PREFIX = "PMT_";
}
