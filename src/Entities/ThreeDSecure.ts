import { ISecureCheck } from "src/PaymentMethods";
import { ExemptionReason, Secure3dStatus, Secure3dVersion } from "./Enums";
import { MessageExtension } from "./MessageExtension";
import { MerchantDataCollection } from "./MerchantDataCollection";

export class ThreeDSecure implements ISecureCheck {
  acsTransactionId: string;
  acsEndVersion: string;
  acsStartVersion: string;
  acsInfoIndicator: string[];
  acsInterface: string;
  acsUiTemplate: string;
  algorithm: number;
  authenticationSource: string;
  authenticationType: string;
  authenticationValue: string;
  cardHolderResponseInfo: string;
  amount: number | string;
  cavv: string;
  challengeMandated: boolean;
  challengeReturnUrl: string;
  messageExtension: MessageExtension[];
  currency: string;
  decoupledResponseIndicator: string;
  directoryServerTransactionId: string;
  directoryServerEndVersion: string;
  directoryServerStartVersion: string;
  eci: number;
  enrolled: Secure3dStatus;
  exemptStatus: string;
  exemptReason: ExemptionReason;
  issuerAcsUrl: string;
  merchantData: MerchantDataCollection;
  messageCategory: string;
  messageVersion: string;
  messageType: string;
  orderId: string;
  payerAuthenticationRequest: string;
  paymentDataSource: string;
  paymentDataType: string;
  sdkInterface: string;
  sdkUiType: string;
  secureCode: string;
  serverTransactionId: string;
  status: Secure3dStatus;
  statusReason: string;
  version: Secure3dVersion;
  whitelistStatus: string;
  xid: string;
  sessionDataFieldName: string;
  liabilityShift: string;
  acsReferenceNumber: string;
  providerServerTransRef: string;

  constructor() {
    this.paymentDataType = "3DSecure";
    this.merchantData = new MerchantDataCollection();
  }

  getVersion(): Secure3dVersion {
    return this.version;
  }

  setVersion(version: Secure3dVersion): void {
    this.version = version;
    this.merchantData.add("version", version, false);
  }

  getMerchantData(): MerchantDataCollection {
    if (!this.merchantData) {
      this.merchantData = new MerchantDataCollection();
    }
    return this.merchantData;
  }

  setMerchantData(merchantData: MerchantDataCollection): void {
    if (this.merchantData !== null && this.merchantData !== undefined) {
      this.merchantData.mergeHidden(merchantData);
    }

    this.merchantData = merchantData;
    if (this.merchantData.hasKey("amount")) {
      this.amount = this.merchantData.getValue("amount");
    }
    if (this.merchantData.hasKey("currency")) {
      this.currency = this.merchantData.getValue("currency");
    }
    if (this.merchantData.hasKey("orderId")) {
      this.orderId = this.merchantData.getValue("orderId");
    }
    if (this.merchantData.hasKey("version")) {
      this.version = this.merchantData.getValue("version");
    }
  }

  getAmount(): number | string {
    return this.amount;
  }

  setAmount(value: number | string): void {
    this.amount = Number(value).toFixed(2);
    this.getMerchantData().add("amount", this.amount, false);
  }

  getCurrency(): string {
    return this.currency;
  }

  setCurrency(value: string): void {
    this.currency = value;
    this.getMerchantData().add("currency", this.currency, false);
  }

  getOrderId(): string {
    return this.orderId;
  }

  setOrderId(value: string): void {
    this.orderId = value;
    this.getMerchantData().add("orderId", this.orderId, false);
  }

  merge(secureEcom: ThreeDSecure): void {
    if (secureEcom) {
      this.acsTransactionId = this.mergeValue(
        this.acsTransactionId,
        secureEcom.acsTransactionId,
      );
      this.acsEndVersion = this.mergeValue(
        this.acsEndVersion,
        secureEcom.acsEndVersion,
      );
      this.acsStartVersion = this.mergeValue(
        this.acsStartVersion,
        secureEcom.acsStartVersion,
      );
      this.acsInterface = this.mergeValue(
        this.acsInterface,
        secureEcom.acsInterface,
      );
      this.acsUiTemplate = this.mergeValue(
        this.acsUiTemplate,
        secureEcom.acsUiTemplate,
      );
      this.algorithm = this.mergeValue(this.algorithm, secureEcom.algorithm);
      this.amount = this.mergeValue(this.amount, secureEcom.amount);
      this.authenticationSource = this.mergeValue(
        this.authenticationSource,
        secureEcom.authenticationSource,
      );
      this.authenticationType = this.mergeValue(
        this.authenticationType,
        secureEcom.authenticationType,
      );
      this.authenticationValue = this.mergeValue(
        this.authenticationValue,
        secureEcom.authenticationValue,
      );
      this.cardHolderResponseInfo = this.mergeValue(
        this.cardHolderResponseInfo,
        secureEcom.cardHolderResponseInfo,
      );
      this.cavv = this.mergeValue(this.cavv, secureEcom.cavv);
      this.challengeMandated = this.mergeValue(
        this.challengeMandated,
        secureEcom.challengeMandated,
      );
      this.messageExtension = this.mergeValue(
        this.messageExtension,
        secureEcom.messageExtension,
      );
      this.currency = this.mergeValue(this.currency, secureEcom.currency);
      this.decoupledResponseIndicator = this.mergeValue(
        this.decoupledResponseIndicator,
        secureEcom.decoupledResponseIndicator,
      );
      this.directoryServerTransactionId = this.mergeValue(
        this.directoryServerTransactionId,
        secureEcom.directoryServerTransactionId,
      );
      this.directoryServerEndVersion = this.mergeValue(
        this.directoryServerEndVersion,
        secureEcom.directoryServerEndVersion,
      );
      this.directoryServerStartVersion = this.mergeValue(
        this.directoryServerStartVersion,
        secureEcom.directoryServerStartVersion,
      );
      this.eci = this.mergeValue(this.eci, secureEcom.eci);
      this.enrolled = this.mergeValue(this.enrolled, secureEcom.enrolled);
      this.issuerAcsUrl = this.mergeValue(
        this.issuerAcsUrl,
        secureEcom.issuerAcsUrl,
      );
      this.messageCategory = this.mergeValue(
        this.messageCategory,
        secureEcom.messageCategory,
      );
      this.messageVersion = this.mergeValue(
        this.messageVersion,
        secureEcom.messageVersion,
      );
      this.orderId = this.mergeValue(this.orderId, secureEcom.orderId);
      this.payerAuthenticationRequest = this.mergeValue(
        this.payerAuthenticationRequest,
        secureEcom.payerAuthenticationRequest,
      );
      this.paymentDataSource = this.mergeValue(
        this.paymentDataSource,
        secureEcom.paymentDataSource,
      );
      this.paymentDataType = this.mergeValue(
        this.paymentDataType,
        secureEcom.paymentDataType,
      );
      this.sdkInterface = this.mergeValue(
        this.sdkInterface,
        secureEcom.sdkInterface,
      );
      this.sdkUiType = this.mergeValue(this.sdkUiType, secureEcom.sdkUiType);
      this.serverTransactionId = this.mergeValue(
        this.serverTransactionId,
        secureEcom.serverTransactionId,
      );
      this.status = this.mergeValue(this.status, secureEcom.status);
      this.statusReason = this.mergeValue(
        this.statusReason,
        secureEcom.statusReason,
      );
      this.version = this.mergeValue(this.version, secureEcom.version);
      this.whitelistStatus = this.mergeValue(
        this.whitelistStatus,
        secureEcom.whitelistStatus,
      );
      this.xid = this.mergeValue(this.xid, secureEcom.xid);
      this.messageType = this.mergeValue(
        this.messageType,
        secureEcom.messageType,
      );
      this.sessionDataFieldName = this.mergeValue(
        this.sessionDataFieldName,
        secureEcom.sessionDataFieldName,
      );
      this.challengeReturnUrl = this.mergeValue(
        this.challengeReturnUrl,
        secureEcom.challengeReturnUrl,
      );
      this.exemptStatus = this.mergeValue(
        this.exemptStatus,
        secureEcom.exemptStatus,
      );
      this.exemptReason = this.mergeValue(
        this.exemptReason,
        secureEcom.exemptReason,
      );
      this.liabilityShift = this.mergeValue(
        this.liabilityShift,
        secureEcom.liabilityShift,
      );
      this.acsReferenceNumber = this.mergeValue(
        this.acsReferenceNumber,
        secureEcom.acsReferenceNumber,
      );
      this.providerServerTransRef = this.mergeValue(
        this.providerServerTransRef,
        secureEcom.providerServerTransRef,
      );
    }
  }

  private mergeValue(currentValue: any, mergeValue: any): any {
    return mergeValue !== null ? mergeValue : currentValue;
  }
}
