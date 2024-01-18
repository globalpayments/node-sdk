import { CreditCardData } from "../PaymentMethods";
import { DocumentUploadData } from "../Entities/DocumentUploadData";
import { AccountPermissions } from "../Entities/ProFac/AccountPermissions";
import { BankAccountData } from "../Entities/ProFac/BankAccountData";
import { BankAccountOwnershipData } from "../Entities/ProFac/BankAccountOwnershipData";
import { BeneficialOwnerData } from "../Entities/ProFac/BeneficialOwnerData";
import { BusinessData } from "../Entities/ProFac/BusinessData";
import { DeviceData } from "../Entities/ProFac/DeviceData";
import { FlashFundsPaymentCardData } from "../Entities/ProFac/FlashFundsPaymentCardData";
import { GrossBillingInformation } from "../Entities/ProFac/GrossBillingInformation";
import { RenewAccountData } from "../Entities/ProFac/RenewAccountData";
import { SignificantOwnerData } from "../Entities/ProFac/SignificantOwnerData";
import { ThreatRiskData } from "../Entities/ProFac/ThreatRiskData";
import { UserPersonalData } from "../Entities/ProFac/UserPersonalData";
import { SSORequestData } from "../Entities/SSORequestData";

import {
  Address,
  BaseBuilder,
  ServicesContainer,
  Transaction,
  TransactionModifier,
  TransactionType,
} from "../";
import { OrderDevice } from "../Entities/ProFac/OrderDevice";

export class PayFacBuilder extends BaseBuilder<Transaction> {
  protected setupValidations(): void {}

  public transactionType: TransactionType;
  public transactionModifier: TransactionModifier;

  /// <summary>
  /// Primary Bank Account Information - Optional. Used to add a bank account to which funds can be settled
  /// </summary>
  public bankAccountData: BankAccountData;

  /// <summary>
  /// Merchant Beneficiary Owner Information - Required for all merchants validating KYC based off of personal data
  /// </summary>
  public beneficialOwnerData: BeneficialOwnerData;

  /// <summary>
  /// User for Portico Device Ordering. Must set TimeZone property as well when ordering Portico devices
  /// </summary>
  public deviceData: DeviceData;

  /// <summary>
  /// Required for partners ordering Portico devices. Valid values: [ UTC, PT, MST, MT, CT, ET, HST, AT, AST, AKST, ACT, EET, EAT, MET, NET, PLT, IST, BST, VST, CTT, JST, ACT, AET, SST, NST, MIT, CNT, AGT, CAT ]
  /// </summary>
  public timeZone: string;

  /// <summary>
  /// Business Data - Required for business validated accounts. May also be required for personal validated accounts
  /// </summary>
  public businessData: BusinessData;

  /// <summary>
  /// Significant Owner Information - May be required for some partners based on ProPay Risk decision
  /// </summary>
  public significantOwnerData: SignificantOwnerData;

  /// <summary>
  /// Threat Risk Assessment Information - May be required based on ProPay Risk decision
  /// </summary>
  public threatRiskData: ThreatRiskData;

  /// <summary>
  /// User/Merchant Personal Data
  /// </summary>
  public userPersonalData: UserPersonalData;

  public creditCardInformation: CreditCardData;
  public aCHInformation: BankAccountData;
  public mailingAddressInformation: Address;
  public secondaryBankInformation: BankAccountData;
  public grossBillingInformation: GrossBillingInformation;
  public negativeLimit: string;
  public renewalAccountData: RenewAccountData;
  public accountNumber: string;
  public password: string;
  public accountPermissions: AccountPermissions;
  public primaryBankAccountOwner: BankAccountOwnershipData;
  public secondaryBankAccountOwner: BankAccountOwnershipData;
  public documentUploadData: DocumentUploadData;
  public sSORequestData: SSORequestData;
  public amount: string;
  public receivingAccountNumber: string;
  public allowPending: boolean;
  public cCAmount: string;
  public requireCCRefund: boolean;
  public transNum: string;

  public externalID: string;
  public sourceEmail: string;
  public gatewayTransactionId: string;
  public cardBrandTransactionId: string;
  public globaltransId: string;
  public globalTransSource: string;

  public orderDevice: OrderDevice;
  public orderDeviceData: DeviceData;

  public constructor(
    type: TransactionType,
    modifer: TransactionModifier = TransactionModifier.None,
  ) {
    super();
    this.transactionType = type;
    this.transactionModifier = modifer;
  }

  public execute(configName: string = "default"): Promise<Transaction> {
    super.execute();
    return ServicesContainer.instance()
      .getXmlClient(configName)
      .processPayFac(this);
  }

  public withBankAccountData(bankAccountData: BankAccountData) {
    this.bankAccountData = bankAccountData;
    return this;
  }

  public withBeneficialOwnerData(beneficialOwnerData: BeneficialOwnerData) {
    this.beneficialOwnerData = beneficialOwnerData;
    return this;
  }

  public withDeviceData(deviceData: DeviceData) {
    this.deviceData = deviceData;
    return this;
  }

  /// <summary>
  /// Required for partners ordering Portico devices. Valid values: [ UTC, PT, MST, MT, CT, ET, HST, AT, AST, AKST, ACT, EET, EAT, MET, NET, PLT, IST, BST, VST, CTT, JST, ACT, AET, SST, NST, MIT, CNT, AGT, CAT ]
  /// </summary>
  public withTimeZone(timezone: string) {
    this.timeZone = timezone;
    return this;
  }

  public withBusinessData(businessData: BusinessData) {
    this.businessData = businessData;
    return this;
  }

  public withSignificantOwnerData(significantOwnerData: SignificantOwnerData) {
    this.significantOwnerData = significantOwnerData;
    return this;
  }

  public withThreatRiskData(threatRiskData: ThreatRiskData) {
    this.threatRiskData = threatRiskData;
    return this;
  }

  public withUserPersonalData(userPersonalData: UserPersonalData) {
    this.userPersonalData = userPersonalData;
    return this;
  }

  public withCreditCardData(creditCardInformation: CreditCardData) {
    this.creditCardInformation = creditCardInformation;
    return this;
  }

  public withACHData(achInformation: BankAccountData) {
    this.aCHInformation = achInformation;
    return this;
  }

  public withMailingAddress(mailingAddressInformation: Address) {
    this.mailingAddressInformation = mailingAddressInformation;
    return this;
  }

  public withSecondaryBankAccountData(
    secondaryBankInformation: BankAccountData,
  ) {
    this.secondaryBankInformation = secondaryBankInformation;
    return this;
  }

  public withGrossBillingSettleData(
    grossBillingInformation: GrossBillingInformation,
  ) {
    this.grossBillingInformation = grossBillingInformation;
    return this;
  }

  public withAccountNumber(accountNumber: string) {
    this.accountNumber = accountNumber;
    return this;
  }

  public withPassword(password: string) {
    this.password = password;
    return this;
  }

  public withAccountPermissions(accountPermissions: AccountPermissions) {
    this.accountPermissions = accountPermissions;
    return this;
  }

  public withPrimaryBankAccountOwner(
    primaryBankAccountOwner: BankAccountOwnershipData,
  ) {
    this.primaryBankAccountOwner = primaryBankAccountOwner;
    return this;
  }

  public withSecondaryBankAccountOwner(
    secondaryBankAccountOwner: BankAccountOwnershipData,
  ) {
    this.secondaryBankAccountOwner = secondaryBankAccountOwner;
    return this;
  }

  public withDocumentUploadData(docUploadData: DocumentUploadData) {
    this.documentUploadData = docUploadData;
    return this;
  }

  public withSSORequestData(ssoRequestData: SSORequestData) {
    this.sSORequestData = ssoRequestData;
    return this;
  }

  public withNegativeLimit(negativeLimit: string) {
    this.negativeLimit = negativeLimit;
    return this;
  }

  public withRenewalAccountData(renewalAccountData: RenewAccountData) {
    this.renewalAccountData = renewalAccountData;
    return this;
  }

  public withAmount(amount: string) {
    this.amount = amount;
    return this;
  }

  public withFlashFundsPaymentCardData(cardData: FlashFundsPaymentCardData) {
    this.FlashFundsPaymentCardData = cardData;
    return this;
  }

  public withReceivingAccountNumber(receivingAccountNumber: string) {
    this.receivingAccountNumber = receivingAccountNumber;
    return this;
  }

  public withAllowPending(allowPending: boolean) {
    this.allowPending = allowPending;
    return this;
  }

  public withCCAmount(ccAmount: string) {
    this.cCAmount = ccAmount;
    return this;
  }

  public withRequireCCRefund(requireCCRefund: boolean) {
    this.requireCCRefund = requireCCRefund;
    return this;
  }

  public withTransNum(transNum: string) {
    this.transNum = transNum;
    return this;
  }

  public withGatewayTransactionId(gatewayTransactionId: string) {
    this.gatewayTransactionId = gatewayTransactionId;
    return this;
  }

  public withCardBrandTransactionId(cardBrandTransactionId: string) {
    this.cardBrandTransactionId = cardBrandTransactionId;
    return this;
  }

  public withGlobaltransId(globaltransId: string) {
    this.globaltransId = globaltransId;
    return this;
  }

  public withGlobalTransSource(globalTransSource: string) {
    this.globalTransSource = globalTransSource;
    return this;
  }

  public withExternalID(externalId: string) {
    this.externalID = externalId;
    return this;
  }

  public withSourceEmail(sourceEmail: string) {
    this.sourceEmail = sourceEmail;
    return this;
  }

  public withOrderDevice(orderDevice: OrderDevice) {
    this.orderDevice = orderDevice;
    return this;
  }

  public withOrderDeviceData(orderDeviceData: DeviceData) {
    this.orderDeviceData = orderDeviceData;
    return this;
  }
}
