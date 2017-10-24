import {
  AuthorizationBuilder,
  CvnPresenceIndicator,
  EncryptionData,
  EntryMethod,
  InquiryType,
  ManagementBuilder,
  PaymentMethodType,
} from "../";

export interface IAuthable {
  authorize(amount?: string | number): AuthorizationBuilder;
}

export interface IBalanceable {
  balanceInquiry(inquiry?: InquiryType): AuthorizationBuilder;
}

export interface ICardData {
  number: string;
  expMonth: string;
  expYear: string;
  cvn: string;
  cvnPresenceIndicator: CvnPresenceIndicator;
  cardHolderName: string;
  cardPresent: boolean;
  readerPresent: boolean;
}

export interface IChargable {
  charge(amount?: string | number): AuthorizationBuilder;
}

export interface IEditable {
  edit(amount?: string | number): AuthorizationBuilder;
}

export interface IEncryptable {
  encryptionData: EncryptionData;
}

export interface IPaymentMethod {
  paymentMethodType: PaymentMethodType;
}

export interface IPinProtected {
  pinBlock: string;
}

export interface IPrePayable {
  addValue(amount?: string | number): AuthorizationBuilder;
}

export interface IRefundable {
  refund(amount?: string | number): AuthorizationBuilder;
}

export interface IReversable {
  reverse(amount?: string | number): AuthorizationBuilder;
}

export interface ITokenizable {
  token: string;
  tokenize(): AuthorizationBuilder;
}

export interface ITrackData {
  value: string;
  entryMethod: EntryMethod;
}

export interface IVerifyable {
  verify(): AuthorizationBuilder;
}

export interface IVoidable {
  void(): ManagementBuilder;
}
