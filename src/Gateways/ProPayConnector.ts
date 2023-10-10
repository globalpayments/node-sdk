import { Transaction } from "../";
import { PayFacBuilder } from "../../src/Builders/PayFacBuilder";
import { TransactionModifier, TransactionType } from "../Entities/Enums";
import { IPayFacProvider } from "./IPayFacProvider";
import { XmlGateway } from "./XmlGateway";
import {
    CData as cData,
    Element,
    Element as element,
    XML as xml,
    SubElement as subElement,
    ElementTree,
} from "@azz/elementtree";
import { BusinessData } from "../Entities/ProFac/BusinessData";
import { UserPersonalData } from "../Entities/ProFac/UserPersonalData";
import { AccountPermissions } from "../Entities/ProFac/AccountPermissions";
import { ThreatRiskData } from "../Entities/ProFac/ThreatRiskData";
import { DeviceData } from "../Entities/ProFac/DeviceData";
import { SignificantOwnerData } from "../Entities/ProFac/SignificantOwnerData";
import { BeneficialOwnerData } from "../Entities/ProFac/BeneficialOwnerData";
import { GrossBillingInformation } from "../Entities/ProFac/GrossBillingInformation";
import { RenewAccountData } from "../Entities/ProFac/RenewAccountData";
import { FlashFundsPaymentCardData } from "../Entities/ProFac/FlashFundsPaymentCardData";
import { SSORequestData } from "../Entities/SSORequestData";
import { Address } from "../Entities";
import { DocumentUploadData } from "../Entities/DocumentUploadData";
import { PayFacResponseData } from "../Entities/ProFac/PayFacResponseData";
import { BankAccountData } from "../Entities/ProFac/BankAccountData";
import { AccountBalanceResponseData } from "../Entities/ProFac/AccountBalanceResponseData";
import { BeneficialOwnerDataResult } from "../Entities/ProFac/BeneficialOwnerDataResult";
import * as fs from 'fs';
import { OrderDevice } from "../Entities/ProFac/OrderDevice";
import { GatewayConfig } from "src/ServiceConfigs";

export class ProPayConnector extends XmlGateway implements IPayFacProvider {
    public config: GatewayConfig;

    public certStr: string;
    public termID: string;
    public x509CertificatePath: string;
    public x509CertStr: string;
    public selfSignedCert: string;

    public processPayFac(builder: PayFacBuilder): Promise<Transaction> {
        const transaction = element("XMLRequest");

        // Credentials 
        subElement(transaction, "certStr").append(cData(this.certStr.toString()));
        subElement(transaction, "termid").append(cData(this.termID));
        subElement(transaction, "class").append(cData("partner"));

        //Transaction
        const xmlTrans = subElement(transaction, "XMLTrans");
        subElement(xmlTrans, "transType").append(cData(this.mapRequestType(builder)));

        this.HydrateAccountDetails(xmlTrans, builder);

        return this.doTransaction(new ElementTree(transaction).write()).then((response) => this.mapResponse(builder, response));
    }

    private HydrateAccountDetails(xmlTrans: element, builder: PayFacBuilder) {
        this.UpdateGatewaySettings(builder);

        // common fields
        this.hydrateCommonFields(xmlTrans, builder);

        if (builder.password != null) {
            subElement(xmlTrans, "password").append(cData(builder.password));
        }

        if (builder.accountPermissions != null) {
            this.HydrateAccountPermissions(xmlTrans, builder.accountPermissions);
        }

        if (builder.userPersonalData != null) {
            this.HydrateUserPersonalData(xmlTrans, builder.userPersonalData);
        }

        if (builder.businessData != null) {
            this.HydrateBusinessData(xmlTrans, builder.businessData);
        }

        this.HydrateBankDetails(xmlTrans, builder);

        if (builder.mailingAddressInformation != null || builder.mailingAddressInformation != undefined) {
            this.HydrateMailAddress(xmlTrans, builder.mailingAddressInformation);
        }

        if (builder.threatRiskData != null) {
            this.HydrateThreatRiskData(xmlTrans, builder.threatRiskData);
        }

        if (builder.significantOwnerData != null) {
            this.HydrateSignificantOwnerData(xmlTrans, builder.significantOwnerData);
        }

        if (builder.timeZone && builder.timeZone.trim()) {
            subElement(xmlTrans, "TimeZone").append(cData(builder.timeZone));
        }

        if (builder.deviceData != null) {
            this.HydrateDeviceData(xmlTrans, builder.deviceData);
        }

        if (builder.beneficialOwnerData != null || builder.beneficialOwnerData != undefined) {
            this.HydrateBeneficialOwnerData(xmlTrans, builder.beneficialOwnerData);
        }

        if (builder.grossBillingInformation != null) {
            this.HydrateGrossBillingData(xmlTrans, builder.grossBillingInformation);
        }

        if (builder.renewalAccountData != null) {
            this.HydrateAccountRenewDetails(xmlTrans, builder.renewalAccountData);
        }

        if (builder.FlashFundsPaymentCardData != null) {
            this.HydrateFlashFundsPaymentCardData(xmlTrans, builder.FlashFundsPaymentCardData);
        }

        if (builder.documentUploadData != null) {
            this.HydrateDocumentUploadData(xmlTrans, builder.TransactionType, builder.documentUploadData);
        }

        if (builder.sSORequestData != null) {
            this.HydrateSSORequestData(xmlTrans, builder.sSORequestData);
        }

        if (builder.orderDevice != null) {
            this.HydrateOrderDeviceData(xmlTrans, builder.orderDevice);
        }
        
        if (builder.orderDeviceData != null) {
            this.HydrateOrderDeviceDetails(xmlTrans, builder.orderDeviceData)
        }

        this.HydrateBankAccountOwnershipData(xmlTrans, builder);
    }

    private hydrateCommonFields(xmlTrans: Element, builder: PayFacBuilder) {
        const elementMap = {
            'accountNum': builder.accountNumber ? builder.accountNumber : '',
            'amount': builder.amount ? builder.amount : '',
            'recAccntNum': builder.receivingAccountNumber ? builder.receivingAccountNumber : '',
            'allowPending': builder.allowPending == true ? 'Y' : '',
            'ccAmount': builder.cCAmount ? builder.cCAmount : '',
            'requireCCRefund': builder.requireCCRefund == true ? 'Y' : builder.requireCCRefund == false ? 'N' : '',
            'transNum': builder.transNum ? builder.transNum : '',
            'gatewayTransactionId': builder.gatewayTransactionId ? builder.gatewayTransactionId : '',
            'globaltransId': builder.globaltransId ? builder.globaltransId : '',
            'globalTransSource': builder.globalTransSource ? builder.globalTransSource : '',
            'cardBrandTransactionId': builder.cardBrandTransactionId ? builder.cardBrandTransactionId : '',
        };

        this.createNewElements(xmlTrans, elementMap);

    }

    private HydrateBankAccountOwnershipData(xmlTrans: Element, builder: PayFacBuilder) {
        if (builder.primaryBankAccountOwner != null || builder.secondaryBankAccountOwner != null) {
            const ownersDataTag = subElement(xmlTrans, "BankAccountOwnerData");

            if (builder.primaryBankAccountOwner != null) {
                const primaryOwnerTag = subElement(ownersDataTag, "PrimaryBankAccountOwner");
                subElement(primaryOwnerTag, "FirstName").text = builder.primaryBankAccountOwner.firstName;
                subElement(primaryOwnerTag, "LastName").text = builder.primaryBankAccountOwner.lastName;
                subElement(primaryOwnerTag, "Address1").text = builder.primaryBankAccountOwner.ownerAddress?.streetAddress1;
                subElement(primaryOwnerTag, "Address2").text = builder.primaryBankAccountOwner.ownerAddress.streetAddress2;
                subElement(primaryOwnerTag, "Address3").text = builder.primaryBankAccountOwner.ownerAddress.streetAddress3;
                subElement(primaryOwnerTag, "City").text = builder.primaryBankAccountOwner.ownerAddress.city;
                subElement(primaryOwnerTag, "StateProvince").text = builder.primaryBankAccountOwner.ownerAddress.state;
                subElement(primaryOwnerTag, "PostalCode").text = builder.primaryBankAccountOwner.ownerAddress.postalCode;
                subElement(primaryOwnerTag, "Country").text = builder.primaryBankAccountOwner.ownerAddress.country;
                subElement(primaryOwnerTag, "Phone").text = builder.primaryBankAccountOwner.phoneNumber;
            }

            if (builder.secondaryBankAccountOwner != null) {
                const secondaryOwnerTag = subElement(ownersDataTag, "SecondaryBankAccountOwner");
                subElement(secondaryOwnerTag, "FirstName").text = builder.secondaryBankAccountOwner.firstName;
                subElement(secondaryOwnerTag, "LastName").text = builder.secondaryBankAccountOwner.lastName;
                subElement(secondaryOwnerTag, "Address1").text = builder.secondaryBankAccountOwner.ownerAddress?.streetAddress1;
                subElement(secondaryOwnerTag, "Address2").text = builder.secondaryBankAccountOwner.ownerAddress.streetAddress2;
                subElement(secondaryOwnerTag, "Address3").text = builder.secondaryBankAccountOwner.ownerAddress.streetAddress3;
                subElement(secondaryOwnerTag, "City").text = builder.secondaryBankAccountOwner.ownerAddress.city;
                subElement(secondaryOwnerTag, "StateProvince").text = builder.secondaryBankAccountOwner.ownerAddress.state;
                subElement(secondaryOwnerTag, "PostalCode").text = builder.secondaryBankAccountOwner.ownerAddress.postalCode;
                subElement(secondaryOwnerTag, "Country").text = builder.secondaryBankAccountOwner.ownerAddress.country;
                subElement(secondaryOwnerTag, "Phone").text = builder.secondaryBankAccountOwner.phoneNumber;
            }
        }
    }

    private HydrateMailAddress(xmlTrans: Element, mailingAddressInformation: Address) {
        subElement(xmlTrans, "mailAddr").append(cData(mailingAddressInformation?.streetAddress1));
        subElement(xmlTrans, "mailApt").append(cData(mailingAddressInformation?.streetAddress2));
        subElement(xmlTrans, "mailAddr3").append(cData(mailingAddressInformation?.streetAddress3));
        subElement(xmlTrans, "mailCity").append(cData(mailingAddressInformation?.city));
        subElement(xmlTrans, "mailCountry").append(cData(mailingAddressInformation?.country));
        subElement(xmlTrans, "mailState").append(cData(mailingAddressInformation?.state));
        subElement(xmlTrans, "mailZip").append(cData(mailingAddressInformation?.postalCode));
    }

    private HydrateBankDetails(xmlTrans: Element, builder: PayFacBuilder) {
        if (builder.creditCardInformation != null) {
            subElement(xmlTrans, "NameOnCard").append(cData(builder.creditCardInformation.cardHolderName));
            subElement(xmlTrans, "ccNum").append(cData(builder.creditCardInformation.number));
            subElement(xmlTrans, "expDate").append(cData(builder.creditCardInformation.getShortExpiry()));
        }

        if (builder.aCHInformation != null) {
            subElement(xmlTrans, "PaymentBankAccountNumber").append(cData(builder.aCHInformation.accountNumber));
            subElement(xmlTrans, "PaymentBankRoutingNumber").append(cData(builder.aCHInformation.routingNumber));
            subElement(xmlTrans, "PaymentBankAccountType").append(cData(builder.aCHInformation.accountType));
        }

        if (builder.bankAccountData != null) {
            subElement(xmlTrans, "AccountCountryCode").append(cData(builder.bankAccountData.accountCountryCode));
            subElement(xmlTrans, "accountName").append(cData(builder.bankAccountData.accountName));
            subElement(xmlTrans, "AccountNumber").append(cData(builder.bankAccountData.accountNumber));
            subElement(xmlTrans, "AccountOwnershipType").append(cData(builder.bankAccountData.accountOwnershipType));
            subElement(xmlTrans, "AccountType").append(cData(builder.bankAccountData.accountType));
            subElement(xmlTrans, "BankName").append(cData(builder.bankAccountData.bankName));
            subElement(xmlTrans, "RoutingNumber").append(cData(builder.bankAccountData.routingNumber));
        }

        if (builder.secondaryBankInformation != null) {
            subElement(xmlTrans, "SecondaryAccountCountryCode").append(cData(builder.secondaryBankInformation.accountCountryCode));
            subElement(xmlTrans, "SecondaryAccountName").append(cData(builder.secondaryBankInformation.accountName));
            subElement(xmlTrans, "SecondaryAccountNumber").append(cData(builder.secondaryBankInformation.accountNumber));
            subElement(xmlTrans, "SecondaryAccountOwnershipType").append(cData(builder.secondaryBankInformation.accountOwnershipType));
            subElement(xmlTrans, "SecondaryAccountType").append(cData(builder.secondaryBankInformation.accountType));
            subElement(xmlTrans, "SecondaryBankName").append(cData(builder.secondaryBankInformation.bankName));
            subElement(xmlTrans, "SecondaryRoutingNumber").append(cData(builder.secondaryBankInformation.routingNumber));
        }
    }

    private HydrateBusinessData(xmlTrans: Element, businessData: BusinessData) {
        subElement(xmlTrans, "BusinessLegalName").append(cData(businessData.businessLegalName));
        subElement(xmlTrans, "DoingBusinessAs").append(cData(businessData.doingBusinessAs));
        subElement(xmlTrans, "EIN").append(cData(businessData.employerIdentificationNumber));
        subElement(xmlTrans, "MCCCode").append(cData(businessData.merchantCategoryCode));
        subElement(xmlTrans, "WebsiteURL").append(cData(businessData.websiteURL));
        subElement(xmlTrans, "BusinessDesc").append(cData(businessData.businessDescription));
        subElement(xmlTrans, "MonthlyBankCardVolume").append(cData(businessData.monthlyBankCardVolume));
        subElement(xmlTrans, "AverageTicket").append(cData(businessData.averageTicket));
        subElement(xmlTrans, "HighestTicket").append(cData(businessData.highestTicket));
        subElement(xmlTrans, "BusinessAddress").append(cData(businessData.businessAddress?.streetAddress1));
        subElement(xmlTrans, "BusinessAddress2").append(cData(businessData.businessAddress.streetAddress2));
        subElement(xmlTrans, "BusinessCity").append(cData(businessData.businessAddress.city));
        subElement(xmlTrans, "BusinessCountry").append(cData(businessData.businessAddress.country));
        subElement(xmlTrans, "BusinessState").append(cData(businessData.businessAddress.state));
        subElement(xmlTrans, "BusinessZip").append(cData(businessData.businessAddress.postalCode));
        subElement(xmlTrans, "BusinessType").append(cData(businessData.businessType));
    }

    private HydrateUserPersonalData(xmlTrans: Element, userPersonalData: UserPersonalData) {
        subElement(xmlTrans, "firstName").append(cData(userPersonalData.firstName));
        subElement(xmlTrans, "mInitial").append(cData(userPersonalData.middleInitial));
        subElement(xmlTrans, "lastName").append(cData(userPersonalData.lastName));
        subElement(xmlTrans, "dob").append(cData(userPersonalData.dateOfBirth));
        subElement(xmlTrans, "ssn").append(cData(userPersonalData.sSN));
        if (userPersonalData.sourceEmail != null)
            subElement(xmlTrans, "sourceEmail").append(cData(userPersonalData.sourceEmail));
        subElement(xmlTrans, "dayPhone").append(cData(userPersonalData.dayPhone));
        subElement(xmlTrans, "evenPhone").append(cData(userPersonalData.eveningPhone));
        subElement(xmlTrans, "NotificationEmail").append(cData(userPersonalData.notificationEmail));
        subElement(xmlTrans, "currencyCode").append(cData(userPersonalData.currencyCode));
        subElement(xmlTrans, "tier").append(cData(userPersonalData.tier));
        if (userPersonalData.externalID != null)
            subElement(xmlTrans, "externalId").append(cData(userPersonalData.externalID));
        // user address
        if (userPersonalData.userAddress != null)
            subElement(xmlTrans, "addr").append(cData(userPersonalData.userAddress.streetAddress1));
        if (userPersonalData.userAddress != null)
            subElement(xmlTrans, "aptNum").append(cData(userPersonalData.userAddress.streetAddress2));
        if (userPersonalData.userAddress != null)
            subElement(xmlTrans, "addr3").append(cData(userPersonalData.userAddress.streetAddress3));
        if (userPersonalData.userAddress != null)
            subElement(xmlTrans, "city").append(cData(userPersonalData.userAddress.city));
        if (userPersonalData.userAddress != null)
            subElement(xmlTrans, "state").append(cData(userPersonalData.userAddress.state));
        if (userPersonalData.userAddress != null)
            subElement(xmlTrans, "zip").append(cData(userPersonalData.userAddress.postalCode));
        if (userPersonalData.userAddress != null)
            subElement(xmlTrans, "country").append(cData(userPersonalData.userAddress.country));
        
        // mailing address
        if (userPersonalData.mailingAddress != null)
            subElement(xmlTrans, "mailAddr").append(cData(userPersonalData.mailingAddress.streetAddress1));
        if (userPersonalData.mailingAddress != null)
            subElement(xmlTrans, "mailApt").append(cData(userPersonalData.mailingAddress.streetAddress2));
        if (userPersonalData.mailingAddress != null)
            subElement(xmlTrans, "mailAddr3").append(cData(userPersonalData.mailingAddress.streetAddress3));
        if (userPersonalData.mailingAddress != null)
            subElement(xmlTrans, "mailCity").append(cData(userPersonalData.mailingAddress.city));
        if (userPersonalData.mailingAddress != null)
            subElement(xmlTrans, "mailCountry").append(cData(userPersonalData.mailingAddress.state));
        if (userPersonalData.mailingAddress != null)
            subElement(xmlTrans, "mailState").append(cData(userPersonalData.mailingAddress.postalCode));
        if (userPersonalData.mailingAddress != null)
            subElement(xmlTrans, "mailZip").append(cData(userPersonalData.mailingAddress.country));
        
        subElement(xmlTrans, "IpSignup").append(cData(userPersonalData.ipSignup));
        subElement(xmlTrans, "USCitizen").append(cData(userPersonalData.uSCitizen == true ? 'true' : userPersonalData.uSCitizen == false ? 'false' : ''));
        subElement(xmlTrans, "bOAttestation").append(cData(userPersonalData.bOAttestation == true ? 'true' : userPersonalData.bOAttestation == false ? 'false' : ''));
        subElement(xmlTrans, "TermsAcceptanceIP").append(cData(userPersonalData.termsAcceptanceIP));
        subElement(xmlTrans, "TermsAcceptanceTimeStamp").append(cData(userPersonalData.termsAcceptanceTimeStamp));
        subElement(xmlTrans, "TermsVersion").append(cData(userPersonalData.termsVersion == null ? '' : userPersonalData.termsVersion.toString()));
    }

    private HydrateThreatRiskData(xmlTrans: Element, threatRiskData: ThreatRiskData) {
        subElement(xmlTrans, "MerchantSourceip").append(cData(threatRiskData?.merchantSourceIP));
        subElement(xmlTrans, "ThreatMetrixPolicy").append(cData(threatRiskData?.threatMetrixPolicy));
        subElement(xmlTrans, "ThreatMetrixSessionid").append(cData(threatRiskData?.threatMetrixSessionID));
    }

    private HydrateSignificantOwnerData(xmlTrans: Element, significantOwnerData: SignificantOwnerData) {
        subElement(xmlTrans, "AuthorizedSignerFirstName").append(cData(significantOwnerData?.authorizedSignerFirstName));
        subElement(xmlTrans, "AuthorizedSignerLastName").append(cData(significantOwnerData?.authorizedSignerLastName));
        subElement(xmlTrans, "AuthorizedSignerTitle").append(cData(significantOwnerData?.authorizedSignerTitle));
        subElement(xmlTrans, "SignificantOwnerFirstName").append(cData(significantOwnerData?.significantOwner.firstName));
        subElement(xmlTrans, "SignificantOwnerLastName").append(cData(significantOwnerData?.significantOwner.lastName));
        subElement(xmlTrans, "SignificantOwnerSSN").append(cData(significantOwnerData?.significantOwner.sSN));
        subElement(xmlTrans, "SignificantOwnerDateOfBirth").append(cData(significantOwnerData?.significantOwner.DateOfBirth));
        subElement(xmlTrans, "SignificantOwnerStreetAddress").append(cData(significantOwnerData?.significantOwner.ownerAddress?.streetAddress1));
        subElement(xmlTrans, "SignificantOwnerCityName").append(cData(significantOwnerData?.significantOwner.ownerAddress.city));
        subElement(xmlTrans, "SignificantOwnerRegionCode").append(cData(significantOwnerData?.significantOwner.ownerAddress.state));
        subElement(xmlTrans, "SignificantOwnerPostalCode").append(cData(significantOwnerData?.significantOwner.ownerAddress.postalCode));
        subElement(xmlTrans, "SignificantOwnerCountryCode").append(cData(significantOwnerData?.significantOwner.ownerAddress.country));
        subElement(xmlTrans, "SignificantOwnerTitle").append(cData(significantOwnerData?.significantOwner.title));
        subElement(xmlTrans, "SignificantOwnerPercentage").append(cData(significantOwnerData?.significantOwner.percentage));
    }

    private HydrateAccountPermissions(xmlTrans: Element, accountPermissions: AccountPermissions) {
        if (accountPermissions.aCHIn != null)
            subElement(xmlTrans, "ACHIn").append(cData(accountPermissions.aCHIn == true ? "Y" : "N"));
        if (accountPermissions.aCHOut != null)
            subElement(xmlTrans, "ACHOut").append(cData(accountPermissions.aCHOut == true ? "Y" : "N"));
        if (accountPermissions.cCProcessing != null)
            subElement(xmlTrans, "CCProcessing").append(cData(accountPermissions.cCProcessing == true ? "Y" : "N"));
        if (accountPermissions.proPayIn != null)
            subElement(xmlTrans, "ProPayIn").append(cData(accountPermissions.proPayIn == true ? "Y" : "N"));
        if (accountPermissions.proPayOut != null)
            subElement(xmlTrans, "ProPayOut").append(cData(accountPermissions.proPayOut == true ? "Y" : "N"));

        if (accountPermissions.creditCardMonthLimit != null)
            subElement(xmlTrans, "CreditCardMonthLimit").append(cData(accountPermissions.creditCardMonthLimit));
        if (accountPermissions.creditCardTransactionLimit != null)
            subElement(xmlTrans, "CreditCardTransactionLimit").append(cData(accountPermissions.creditCardTransactionLimit));
        if (accountPermissions.merchantOverallStatus != null)
            subElement(xmlTrans, "MerchantOverallStatus").append(cData(String(accountPermissions.merchantOverallStatus)));

        if (accountPermissions.softLimitEnabled != null)
            subElement(xmlTrans, "SoftLimitEnabled", accountPermissions.softLimitEnabled == true ? "Y" : "N");
        if (accountPermissions.aCHPaymentSoftLimitEnabled != null)
            subElement(xmlTrans, "AchPaymentSoftLimitEnabled", accountPermissions.aCHPaymentSoftLimitEnabled == true ? "Y" : "N");
        if (accountPermissions.softLimitACHOffPercent != null)
            subElement(xmlTrans, "SoftLimitAchOffPercent", accountPermissions.softLimitACHOffPercent);
        if (accountPermissions.aCHPaymentACHOffPercent != null)
            subElement(xmlTrans, "AchPaymentAchOffPercent", accountPermissions.aCHPaymentACHOffPercent);
    }

    private HydrateDeviceData(xmlTrans: Element, deviceData: DeviceData) {
        const devices = subElement(xmlTrans, "Devices");
        if (deviceData.devices.length > 0) {
            deviceData.devices.forEach(deviceObj => {
                const device = subElement(devices, "Device");
                subElement(device, "Name").append(cData(deviceObj.name));
                subElement(device, "Quantity").append(cData(deviceObj.quantity == null ? "0" : String(deviceObj.quantity)));
                // if (deviceObj.attributes != null) {
                //     if (deviceObj.attributes.length > 0) {
                //         var attributes = subElement(device, "Attributes");
                //         deviceObj.attributes.forEach(attributeInfo => {
                //             var item = subElement(attributes, "Item");
                //             item.set("Name", attributeInfo.name);
                //             item.set("Value", attributeInfo.value);
                //         })
                //     }
                // }
            })
        }
    }

    private HydrateBeneficialOwnerData(xmlTrans: Element, beneficialOwnerData: BeneficialOwnerData) {
        const ownerDetails = subElement(xmlTrans, "BeneficialOwnerData");
        subElement(ownerDetails, "OwnerCount").text = beneficialOwnerData?.ownersCount;

        if (Number(beneficialOwnerData?.ownersCount) > 0) {
            const ownersList = subElement(ownerDetails, "Owners");
            beneficialOwnerData.ownersList.forEach(ownerInfo => {
                const newOwner = subElement(ownersList, "Owner");
                subElement(newOwner, "FirstName").text = ownerInfo.firstName;
                subElement(newOwner, "LastName").text = ownerInfo.lastName;
                subElement(newOwner, "Email").text = ownerInfo.email;
                subElement(newOwner, "SSN").text = ownerInfo.sSN;
                subElement(newOwner, "DateOfBirth").text = ownerInfo.DateOfBirth;
                subElement(newOwner, "Address").text = ownerInfo.ownerAddress?.streetAddress1;
                subElement(newOwner, "City").text = ownerInfo.ownerAddress.city;
                subElement(newOwner, "State").text = ownerInfo.ownerAddress.state;
                subElement(newOwner, "Zip").text = ownerInfo.ownerAddress.postalCode;
                subElement(newOwner, "Country").text = ownerInfo.ownerAddress.country;
                subElement(newOwner, "Title").text = ownerInfo.title;
                if (ownerInfo.percentage != null)
                    subElement(newOwner, "Percentage").text = ownerInfo.percentage;
            })
        }
    }

    private HydrateGrossBillingData(xmlTrans: Element, grossBillingInformation: GrossBillingInformation) {
        subElement(xmlTrans, "GrossSettleAddress").append(cData(grossBillingInformation.grossSettleAddress?.streetAddress1));
        subElement(xmlTrans, "GrossSettleCity").append(cData(grossBillingInformation.grossSettleAddress.city));
        subElement(xmlTrans, "GrossSettleState").append(cData(grossBillingInformation.grossSettleAddress.state));
        subElement(xmlTrans, "GrossSettleZipCode").append(cData(grossBillingInformation.grossSettleAddress.postalCode));
        subElement(xmlTrans, "GrossSettleCountry").append(cData(grossBillingInformation.grossSettleAddress.country));
        subElement(xmlTrans, "GrossSettleCreditCardNumber").append(cData(grossBillingInformation.grossSettleCreditCardData.Number));
        subElement(xmlTrans, "GrossSettleNameOnCard").append(cData(grossBillingInformation.grossSettleCreditCardData.CardHolderName));
        subElement(xmlTrans, "GrossSettleCreditCardExpDate").append(cData(grossBillingInformation.grossSettleCreditCardData.getShortExpiry()));
        subElement(xmlTrans, "GrossSettleAccountCountryCode").append(cData(grossBillingInformation.grossSettleBankData.accountCountryCode));
        subElement(xmlTrans, "GrossSettleAccountHolderName").append(cData(grossBillingInformation.grossSettleBankData.accountHolderName));
        subElement(xmlTrans, "GrossSettleAccountNumber").append(cData(grossBillingInformation.grossSettleBankData.accountNumber));
        subElement(xmlTrans, "GrossSettleAccountType").append(cData(grossBillingInformation.grossSettleBankData.accountType));
        subElement(xmlTrans, "GrossSettleRoutingNumber").append(cData(grossBillingInformation.grossSettleBankData.routingNumber));
    }

    private HydrateAccountRenewDetails(xmlTrans: Element, renewAccountData: RenewAccountData) {

        const elementMap = {
            'tier': renewAccountData.tier,
            'CVV2': renewAccountData.creditCard.cvn,
            'ccNum': renewAccountData.creditCard.number,
            'expDate': renewAccountData.creditCard.getShortExpiry(),
            'zip': renewAccountData.zipCode,

            'PaymentBankAccountNumber': renewAccountData.paymentBankAccountNumber,
            'PaymentBankRoutingNumber': renewAccountData.paymentBankRoutingNumber,
            'PaymentBankAccountType': renewAccountData.paymentBankAccountType
        };

        this.createNewElements(xmlTrans, elementMap);
    }

    private HydrateFlashFundsPaymentCardData(xmlTrans: Element, cardData: FlashFundsPaymentCardData) {
        subElement(xmlTrans, "ccNum").append(cData(cardData.creditCard.number));
        subElement(xmlTrans, "expDate").append(cData(cardData.creditCard.getShortExpiry()));
        subElement(xmlTrans, "CVV2").append(cData(cardData.creditCard.cvn));
        subElement(xmlTrans, "cardholderName").append(cData(cardData.creditCard.cardHolderName));
        subElement(xmlTrans, "addr").append(cData(cardData.cardholderAddress?.streetAddress1));
        subElement(xmlTrans, "city").append(cData(cardData.cardholderAddress.city));
        subElement(xmlTrans, "state").append(cData(cardData.cardholderAddress.state));
        subElement(xmlTrans, "zip").append(cData(cardData.cardholderAddress.postalCode));
        subElement(xmlTrans, "country").append(cData(cardData.cardholderAddress.country));
    }

    private HydrateDocumentUploadData(xmlTrans: Element, transType: TransactionType, docUploadData: DocumentUploadData) {
        const docNameTag = transType == TransactionType.UploadDocumentChargeback ? "DocumentName" : "documentName";
        const docTypeTag = transType == TransactionType.UploadDocumentChargeback ? "DocType" : "docType";

        subElement(xmlTrans, docNameTag).append(cData(docUploadData.documentName));
        docUploadData.transactionReference ? subElement(xmlTrans, "TransactionReference").append(cData(docUploadData.transactionReference)) : '';
        docUploadData.docCategory ? subElement(xmlTrans, "DocCategory").append(cData(docUploadData.docCategory)) : '';
        subElement(xmlTrans, docTypeTag).append(cData(docUploadData.docType));
        subElement(xmlTrans, "Document").append(cData(docUploadData.document));
    }

    private HydrateSSORequestData(xmlTrans: Element, ssoRequestData: SSORequestData) {
        subElement(xmlTrans, "ReferrerUrl").append(cData(ssoRequestData.referrerURL));
        subElement(xmlTrans, "IpAddress").append(cData(ssoRequestData.iPAddress));
        subElement(xmlTrans, "IpSubnetMask").append(cData(ssoRequestData.iPSubnetMask));
    }

     private HydrateOrderDeviceData(xmlTrans: Element, orderDeviceData: OrderDevice) {
         subElement(xmlTrans, "accntNum").append(cData(orderDeviceData.accountNum.toString()));
         subElement(xmlTrans, "shipTo").append(cData(orderDeviceData.shipTo));
         subElement(xmlTrans, "shipToContact").append(cData(orderDeviceData.shipToContact));
         subElement(xmlTrans, "shipToAddress").append(cData(orderDeviceData.shipToAddress));
         subElement(xmlTrans, "shipToAddress2").append(cData(orderDeviceData.shipToAddress2));
         subElement(xmlTrans, "shipToCity").append(cData(orderDeviceData.shipToCity));
         subElement(xmlTrans, "shipToState").append(cData(orderDeviceData.shipToState));
         subElement(xmlTrans, "shipToZip").append(cData(orderDeviceData.shipToZip));
         subElement(xmlTrans, "shipToPhone").append(cData(orderDeviceData.shipToPhone));
         subElement(xmlTrans, "cardholderName").append(cData(orderDeviceData.cardholderName));
         subElement(xmlTrans, "CcNum").append(cData(orderDeviceData.ccNum));
         subElement(xmlTrans, "ExpDate").append(cData(orderDeviceData.expDate));
         subElement(xmlTrans, "CVV2").append(cData(orderDeviceData.cVV2));
         subElement(xmlTrans, "billingZip").append(cData(orderDeviceData.billingZip));
     }

     private HydrateOrderDeviceDetails(xmlTrans: Element, orderDeviceData: DeviceData) {
        const devices = subElement(xmlTrans, "Devices");
        if (orderDeviceData.devices.length > 0) {
            orderDeviceData.devices.forEach(deviceObj => {
                const device = subElement(devices, "Device");
                subElement(device, "Name").append(cData(deviceObj.name));
                subElement(device, "Quantity").append(cData(deviceObj.quantity == null ? "0" : String(deviceObj.quantity)));
                if (deviceObj.attributes != null) {
                    if (deviceObj.attributes.length > 0) {
                        const attributes = subElement(device, "Attributes");
                        deviceObj.attributes.forEach(attributeInfo => {
                            const item = subElement(attributes, "Item");
                            item.set("Name", attributeInfo.name);
                            item.set("Value", attributeInfo.value);
                        })
                    }
                }
            })
        }
     }

    private UpdateGatewaySettings(builder: PayFacBuilder) {
        const certTransactions: TransactionType[] = [
            TransactionType.EditAccount,
            TransactionType.ObtainSSOKey,
            TransactionType.UpdateBankAccountOwnership,
            TransactionType.AddFunds,
            TransactionType.AddCardFlashFunds
        ];

        if (certTransactions.includes(builder.transactionType)) {
            this.headers["X509Certificate"] = this.setX509Certificate();
        }
    }

    private createNewElements(xmlns: Element, mapping: Record<string, string>) {
        for (const [key, value] of Object.entries(mapping)) {
            if (value != null && value != '')
                subElement(xmlns, key).append(cData(`${value}`));
        }
    }

    private setX509Certificate(): string {
        const x509RawData = fs.readFileSync(this.selfSignedCert);
        return x509RawData.toString().replace(/(\r\n|\n|\r)/gm, "");
    }

    public mapRequestType(builder: PayFacBuilder): string {
        switch (builder.transactionType) {
            case TransactionType.CreateAccount:
                return "01";
            case TransactionType.EditAccount:
                return "42";
            case TransactionType.ResetPassword:
                return "32";
            case TransactionType.RenewAccount:
                return "39";
            case TransactionType.UpdateBeneficialOwnership:
                return "44";
            case TransactionType.DisownAccount:
                return "41";
            case TransactionType.UploadDocumentChargeback:
                return "46";
            case TransactionType.UploadDocument:
                return "47";
            case TransactionType.ObtainSSOKey:
                return "300";
            case TransactionType.UpdateBankAccountOwnership:
                return "210";
            case TransactionType.AddFunds:
                return "37";
            case TransactionType.SweepFunds:
                return "38";
            case TransactionType.AddCardFlashFunds:
                return "209";
            case TransactionType.PushMoneyFlashFunds:
                return "45";
            case TransactionType.DisburseFunds:
                return "02";
            case TransactionType.SpendBack:
                return "11";
            case TransactionType.ReverseSplitPay:
                return "43";
            case TransactionType.SplitFunds:
                return "16";
            case TransactionType.GetAccountDetails:
                // We are using the Additional TransactionModifier to differentiate between GetAccountDetails and GetAccountDetailsEnhanced
                if (builder.transactionModifier == TransactionModifier.Additional) {
                    return "19";
                }
                // If the TransactionModifier isn't "Additional" then it is either "None" or an unsupported value that should be treated as "None"
                return "13";
            case TransactionType.GetAccountBalance:
                return "14";
            case TransactionType.OrderDevice:
                return "430";
            default:
                throw new Error("Unsupported transaction exception.");
        }
    }

    public mapResponse(builder: PayFacBuilder, rawResponse: string): Transaction {
        const xmlTransaction = xml(rawResponse).find(".//XMLTrans");
        const responseCode = xmlTransaction.findtext(".//status");
        if (responseCode != "00" && responseCode != "66") {
            throw new Error("Unexpected Gateway Response: " + String(responseCode));
        }

        const proPayResponse = this.populateProPayResponse(builder, xmlTransaction);
        const response = new Transaction();
        response.payFacData = proPayResponse,
            response.responseCode = responseCode

        return response;
    }

    private populateProPayResponse(builder: PayFacBuilder, root: Element): PayFacResponseData {
        if (builder.transactionType == TransactionType.GetAccountDetails &&
            builder.transactionModifier == TransactionModifier.Additional) {
            return this.populateResponseWithEnhancedAccountDetails(root);
        }
        else {
            const responseData = new PayFacResponseData();
            responseData.accountNumber = this.getAccountNumberFromResponse(root);
            responseData.recAccountNum = root.findtext(".//recAccntNum");
            responseData.password = root.findtext(".//password");
            responseData.amount = root.findtext(".//amount");
            responseData.transNum = root.findtext(".//transNum");
            responseData.pending = root.findtext(".//pending");
            responseData.secondaryAmount = root.findtext(".//secondaryAmount");
            responseData.secondaryTransNum = root.findtext(".//secondaryTransNum");
            responseData.sourceEmail = root.findtext(".//sourceEmail");
            responseData.authToken = root.findtext(".//AuthToken");
            responseData.beneficialOwnerDataResults = this.getBeneficialOwnerDataResultsFromResponse(root);
            responseData.accountStatus = root.findtext(".//accntStatus");
            responseData.physicalAddress = this.getPhysicalAddressFromResponse(root);
            responseData.affiliation = root.findtext(".//affiliation");
            responseData.aPIReady = root.findtext(".//apiReady");
            responseData.currencyCode = root.findtext(".//currencyCode");
            responseData.expiration = root.findtext(".//expiration");
            responseData.signupDate = root.findtext(".//signupDate");
            responseData.tier = root.findtext(".//tier");
            responseData.visaCheckoutMerchantID = root.findtext(".//visaCheckoutMerchantId");
            responseData.creditCardTransactionLimit = root.findtext(".//CreditCardTransactionLimit");
            responseData.creditCardMonthLimit = root.findtext(".//CreditCardMonthLimit");
            responseData.aCHPaymentPerTranLimit = root.findtext(".//ACHPaymentPerTranLimit");
            responseData.aCHPaymentMonthLimit = root.findtext(".//ACHPaymentMonthLimit");
            responseData.creditCardMonthlyVolume = root.findtext(".//CreditCardMonthlyVolume");
            responseData.aCHPaymentMonthlyVolume = root.findtext(".//ACHPaymentMonthlyVolume");
            responseData.reserveBalance = root.findtext(".//ReserveBalance");
            responseData.masterPassCheckoutMerchantID = root.findtext(".//MasterPassCheckoutMerchantId");
            responseData.pendingAmount = root.findtext(".//pendingAmount");
            responseData.reserveAmount = root.findtext(".//reserveAmount>");
            responseData.aCHOut = this.getACHOutBalanceInfoFromResponse(root);
            responseData.flashFunds = this.getFlashFundsBalanceInfoFromResponse(root);
            return responseData;
        }
    }

    private populateResponseWithEnhancedAccountDetails(root: Element): PayFacResponseData {
        const responseResult = new PayFacResponseData();
        responseResult.accountNumber = this.getAccountNumberFromResponse(root);
        const personalData = new UserPersonalData();
        personalData.sourceEmail = root.findtext(".//sourceEmail");
        personalData.firstName = root.findtext(".//firstName");
        personalData.middleInitial = root.findtext(".//middleInitial");
        personalData.lastName = root.findtext(".//lastName");
        personalData.dayPhone = root.findtext(".//dayPhone");
        personalData.eveningPhone = root.findtext(".//evenPhone");
        personalData.externalID = root.findtext(".//externalId");
        personalData.tier = root.findtext(".//tier");
        personalData.currencyCode = root.findtext(".//currencyCode");
        personalData.notificationEmail = root.findtext(".//notificati;onEmail");
        responseResult.personalData = personalData;
        const homeAddress = new Address();
        homeAddress.streetAddress1 = root.findtext(".//addr");
        homeAddress.streetAddress2 = root.findtext(".//aptNum");
        homeAddress.city = root.findtext(".//city");
        homeAddress.state = root.findtext(".//state");
        homeAddress.postalCode = root.findtext(".//postalCode");
        homeAddress.country = root.findtext(".//country");
        responseResult.homeAddress = homeAddress;
        const mailAddress = new Address();
        mailAddress.streetAddress1 = root.findtext(".//mailAddr");
        mailAddress.streetAddress2 = root.findtext(".//mailApt");
        mailAddress.city = root.findtext(".//mailCity");
        mailAddress.state = root.findtext(".//mailState");
        mailAddress.postalCode = root.findtext(".//mailPostalCode");
        mailAddress.country = root.findtext(".//mailCountry");
        responseResult.mailAddress = mailAddress;
        const businessData = new BusinessData();
        businessData.businessLegalName = root.findtext(".//businessLegalName");
        businessData.doingBusinessAs = root.findtext(".//doingBusinessAs");
        businessData.employerIdentificationNumber = root.findtext(".//ein");
        businessData.websiteURL = root.findtext(".//websiteURL");
        businessData.averageTicket = root.findtext(".//averageTicket");
        businessData.highestTicket = root.findtext(".//highestTicket");
        responseResult.businessData = businessData;
        const businessAddress = new Address();
        businessAddress.streetAddress1 = root.findtext(".//businessAddress");
        businessAddress.streetAddress2 = root.findtext(".//businessAddress2");
        businessAddress.city = root.findtext(".//businessCity");
        businessAddress.state = root.findtext(".//businessState");
        businessAddress.postalCode = root.findtext(".//businessZip");
        businessData.businessAddress = businessAddress;
        responseResult.businessData = businessData;

        const accountLimits = new AccountPermissions();
        accountLimits.creditCardTransactionLimit = root.findtext(".//creditCardTransactionLimit");
        accountLimits.creditCardMonthLimit = root.findtext(".//creditCardMonthLimit");
        accountLimits.aCHPaymentSoftLimitEnabled = root.findtext(".//achPaymentSoftLimitEnabled")?.toUpperCase() == "Y" ? true : false;
        accountLimits.aCHPaymentACHOffPercent = root.findtext(".//achPaymentAchOffPercent");
        accountLimits.softLimitEnabled = root.findtext(".//softLimitEnabled")?.toUpperCase() == "Y" ? true : false;
        accountLimits.softLimitACHOffPercent = root.findtext(".//softLimitAchOffPercent");

        responseResult.aCHPaymentPerTranLimit = root.findtext(".//achPaymentPerTranLimit");
        responseResult.aCHPaymentMonthLimit = root.findtext(".//achPaymentMonthLimit");
        responseResult.aCHPaymentMonthlyVolume = root.findtext(".//achPaymentMonthlyVolume");
        responseResult.creditCardMonthlyVolume = root.findtext(".//creditCardMonthlyVolume");
        responseResult.availableBalance = root.findtext(".//availableBalance");
        responseResult.pendingBalance = root.findtext(".//pendingBalance");
        responseResult.reserveBalance = root.findtext(".//reserveBalance");
        responseResult.accountLimits = accountLimits;

        const primaryBankAccountData = new BankAccountData();
        primaryBankAccountData.accountCountryCode = root.findtext(".//primaryAccountCountryCode");
        primaryBankAccountData.accountType = root.findtext(".//primaryAccountType");
        primaryBankAccountData.accountOwnershipType = root.findtext(".//primaryAccountOwnershipType");
        primaryBankAccountData.bankName = root.findtext(".//primaryBankName");
        primaryBankAccountData.accountNumber = root.findtext(".//primaryAccountNumberLast4");
        primaryBankAccountData.routingNumber = root.findtext(".//primaryRoutingNumber");
        responseResult.primaryBankAccountData = primaryBankAccountData;

        const secondaryBankAccountData = new BankAccountData();
        secondaryBankAccountData.accountCountryCode = root.findtext(".//secondaryAccountCountryCode");
        secondaryBankAccountData.accountType = root.findtext(".//secondaryAccountType");
        secondaryBankAccountData.accountOwnershipType = root.findtext(".//secondaryAccountOwnershipTy;e");
        secondaryBankAccountData.bankName = root.findtext(".//secondaryBankName");
        secondaryBankAccountData.accountNumber = root.findtext(".//secondaryAccoun;tNumberLast4");
        secondaryBankAccountData.routingNumber = root.findtext(".//secondaryRoutingNumber");
        responseResult.secondaryBankAccountData = secondaryBankAccountData;

        const grossBillingInformation = new GrossBillingInformation();
        const grossSettleBankData = new BankAccountData();
        grossSettleBankData.accountHolderName = root.findtext(".//grossSettleAccountHolderName");
        grossSettleBankData.accountNumber = root.findtext(".//grossSettleAccountNumberLast4");
        grossSettleBankData.routingNumber = root.findtext(".//grossSettleRoutingNumber");
        grossSettleBankData.accountType = root.findtext(".//grossSettleAccountType");

        const grossSettleAddress = new Address();
        grossSettleAddress.streetAddress1 = root.findtext(".//grossSettleAccountAddress");
        grossSettleAddress.city = root.findtext(".//rossSettleAccountCity");
        grossSettleAddress.state = root.findtext(".//grossSettleAccountState");
        grossSettleAddress.country = root.findtext(".//grossSettleAccountCountryCode");
        grossSettleAddress.postalCode = root.findtext(".//grossSettleAccountZipCode");

        grossBillingInformation.grossSettleBankData = grossSettleBankData;
        grossBillingInformation.grossSettleAddress = grossSettleAddress;
        return responseResult;
    }

    private getAccountNumberFromResponse(root: Element): string {
        // ProPay API 4.1 (Create an account) has the account number specified in the response as "accntNum"
        // All other methods specify it as "accountNum" in the response
        if (root.find(".//accntNum")) {
            return root.findtext(".//accntNum");
        }
        else {
            return root.findtext(".//accountNum");
        }
    }

    private getBeneficialOwnerDataResultsFromResponse(root: Element): Array<BeneficialOwnerDataResult> {
        const beneficialOwnerDataResults = new Array<BeneficialOwnerDataResult>();
        if (root.find("beneficialOwnerDataResult")) {
            root.findall("Owner").forEach(owner => {
                const beneficialOwner = new BeneficialOwnerDataResult();
                beneficialOwner.firstName = owner.findtext(".//FirstName");
                beneficialOwner.lastName = owner.findtext(".//LastName");
                beneficialOwner.status = owner.findtext(".//Status");
                beneficialOwnerDataResults.push(beneficialOwner);
            })
        }
        return beneficialOwnerDataResults;
    }

    private getPhysicalAddressFromResponse(root: Element): Address {
        const addr = new Address();
        if (root.find("addr") || root.find("city") || root.find("state") || root.find("zip")) {
            addr.streetAddress1 = root.findtext(".//addr"),
                addr.city = root.findtext(".//city"),
                addr.state = root.findtext(".//state"),
                addr.postalCode = root.findtext(".//zip")
        }
        return addr;
    }

    private getACHOutBalanceInfoFromResponse(root: Element): AccountBalanceResponseData {
        const balanceResponse = new AccountBalanceResponseData();
        if (root.find("achOut")) {
            balanceResponse.enabled = root.findtext(".//enabled"),
                balanceResponse.limitRemaining = root.findtext(".//limitRemaining"),
                balanceResponse.transferFee = root.findtext(".//transferFee"),
                balanceResponse.feeType = root.findtext(".//feeType"),
                balanceResponse.accountLastFour = root.findtext(".//accountLastFour")
        }
        return balanceResponse;
    }

    private getFlashFundsBalanceInfoFromResponse(root: Element): AccountBalanceResponseData {
        const balanceResponse = new AccountBalanceResponseData();
        if (root.find("flashFunds")) {
            balanceResponse.enabled = root.findtext(".//enabled"),
                balanceResponse.limitRemaining = root.findtext(".//limitRemaining"),
                balanceResponse.transferFee = root.findtext(".//transferFee"),
                balanceResponse.feeType = root.findtext(".//feeType"),
                balanceResponse.accountLastFour = root.findtext(".//accountLastFour")
        }
        return balanceResponse;
    }
}

