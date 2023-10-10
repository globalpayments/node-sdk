import { AccountPermissions } from "../../../../../src/Entities/ProFac/AccountPermissions";
import { BankAccountData } from "../../../../../src/Entities/ProFac/BankAccountData";
import { BeneficialOwnerData } from "../../../../../src/Entities/ProFac/BeneficialOwnerData";
import { BusinessData } from "../../../../../src/Entities/ProFac/BusinessData";
import { DeviceData } from "../../../../../src/Entities/ProFac/DeviceData";
import { DeviceInfo } from "../../../../../src/Entities/ProFac/DeviceInfo";
import { GrossBillingInformation } from "../../../../../src/Entities/ProFac/GrossBillingInformation";
import { OwnersData } from "../../../../../src/Entities/ProFac/OwnersData";
import { RenewAccountData } from "../../../../../src/Entities/ProFac/RenewAccountData";
import { SignificantOwnerData } from "../../../../../src/Entities/ProFac/SignificantOwnerData";
import { ThreatRiskData } from "../../../../../src/Entities/ProFac/ThreatRiskData";
import { UserPersonalData } from "../../../../../src/Entities/ProFac/UserPersonalData";
import { CreditCardData } from "../../../../../src/PaymentMethods";
import * as fs from 'fs';
import { DeviceAttributeInfo } from "../../../../../src/Entities/ProFac/DeviceAttributeInfo";
import { Address } from "../../../../../src/Entities/Address";
import { OrderDevice } from "../../../../../src/Entities/ProFac/OrderDevice";

export class TestAccountData {
    public static GetBankAccountData(): BankAccountData {
        const bankAccountInformation = new BankAccountData();
        bankAccountInformation.accountCountryCode = "USA";
        bankAccountInformation.accountName = "MyBankAccount";
        bankAccountInformation.accountNumber = "123456789";
        bankAccountInformation.accountOwnershipType = "C";
        bankAccountInformation.routingNumber = "102000076";
        return bankAccountInformation;
    }

    public static GetOrderNewDeviceData(): OrderDevice {
        const orderDevice = new OrderDevice();
        orderDevice.accountNum = 718581359;
        orderDevice.shipTo = "Test Company";
        orderDevice.shipToContact = "John Q. Public";
        orderDevice.shipToAddress = "2675 W 600 N";
        orderDevice.shipToAddress2 = "Apt G";
        orderDevice.shipToCity = "Lindon";
        orderDevice.shipToState = "UT";
        orderDevice.shipToZip = "84042";
        orderDevice.shipToPhone = "801-555-1212";
        orderDevice.cardholderName = "Johnny Cage";
        orderDevice.ccNum = "4111111111111111";
        orderDevice.expDate = "0427";
        orderDevice.cVV2 = "999";
        orderDevice.billingZip = "84003";
        return orderDevice;
    }
    
    public static GetDeviceDataForOrderDevice(numDeviceTypes: number = 1, withAttributes: boolean = true): DeviceData {
        const deviceTypes: Array<string> =  ["Secure Submit"];

        const deviceData = new DeviceData();
        deviceData.devices = Array<DeviceInfo>();

        for (let i = 0; i < numDeviceTypes; i++) {
            const deviceInfo = new DeviceInfo();
            if (i >= deviceTypes.length)
                break;
            deviceInfo.name = deviceTypes[i];
            deviceInfo.quantity = 1;
            if (withAttributes) {
                const deviceAtrributeInfo = new DeviceAttributeInfo();
                deviceAtrributeInfo.name = "Heartland.AMD.OfficeKey",
                    deviceAtrributeInfo.value = "123456"
                deviceInfo.attributes = [deviceAtrributeInfo];
            }
            deviceData.devices = [deviceInfo];
        }
        return deviceData;
    }

    public static GetBusinessData(): BusinessData {
        const businessData = new BusinessData();
        businessData.businessLegalName = "Twain Enterprises";
        businessData.doingBusinessAs = "Twain Enterprises";
        businessData.employerIdentificationNumber = String(this.getRandomInt(100000000, 999999999));
        businessData.businessDescription = "Accounting Services";
        businessData.websiteURL = "https://www.Propay.com";
        businessData.merchantCategoryCode = "5399";
        businessData.monthlyBankCardVolume = "50000";
        businessData.averageTicket = "100";
        businessData.highestTicket = "300";
        businessData.businessType = "D";
        const businessAddress = new Address();
        businessAddress.streetAddress1 = "123 Main St.";
        businessAddress.city = "Downtown";
        businessAddress.state = "NJ";
        businessAddress.postalCode = "12345";
        businessAddress.country = "USA";
        businessData.businessAddress = businessAddress;
        return businessData;
    }

    public static GetUserPersonalData(): UserPersonalData {
        const accountPersonalInformation = new UserPersonalData();
        accountPersonalInformation.dayPhone = "4464464464";
        accountPersonalInformation.eveningPhone = "4464464464";
        accountPersonalInformation.externalID = String(this.getRandomInt(1000000, 999999999));
        accountPersonalInformation.firstName = "David";
        accountPersonalInformation.lastName = "Tennant";
        accountPersonalInformation.phonePIN = "1234";
        accountPersonalInformation.sourceEmail = 'user' + this.getRandomInt(1, 10000) + '@user.com';
        accountPersonalInformation.sSN = "123456789";
        accountPersonalInformation.dateOfBirth = "01-01-1981";
        accountPersonalInformation.tier = "TestEIN";
        accountPersonalInformation.ipSignup = '4.14.150.145';
        accountPersonalInformation.uSCitizen = true;
        accountPersonalInformation.bOAttestation = true;
        accountPersonalInformation.termsAcceptanceIP = '4.14.150.145';
        accountPersonalInformation.termsAcceptanceTimeStamp = '2022-10-27 12:57:08.2021237';
        accountPersonalInformation.termsVersion = 1;

        const userAddress = new Address();
        userAddress.streetAddress1 = "123 Main St.";
        userAddress.city = "Downtown";
        userAddress.state = "NJ";
        userAddress.postalCode = "12345";
        userAddress.country = "USA";
        accountPersonalInformation.userAddress = userAddress;

        const mailingAddress = new Address();
        mailingAddress.streetAddress1 = "123 Main St.";
        mailingAddress.city = "Downtown";
        mailingAddress.state = "NJ";
        mailingAddress.postalCode = "12345";
        mailingAddress.country = "USA";
        accountPersonalInformation.mailingAddress = mailingAddress;
        return accountPersonalInformation;
    }

    public static GetThreatRiskData(): ThreatRiskData {
        const threatRiskData = new ThreatRiskData();
        threatRiskData.merchantSourceIP = "8.8.8.8";
        threatRiskData.threatMetrixPolicy = "Default";
        threatRiskData.threatMetrixSessionID = "dad889c1-1ca4-4fq71-8f6f-807eb4408bc7";
        return threatRiskData;
    }

    public static GetSignificantOwnerData(): SignificantOwnerData {
        const significantOwnerData = new SignificantOwnerData();
        significantOwnerData.authorizedSignerFirstName = "John";
        significantOwnerData.authorizedSignerLastName = "Doe";
        significantOwnerData.authorizedSignerTitle = "Director";

        significantOwnerData.significantOwner.firstName = "John";
        return significantOwnerData;
    }

    public static GetBeneficialOwnerData(): BeneficialOwnerData {
        const ownersInformation = new BeneficialOwnerData();
        ownersInformation.ownersCount = "2";
        const firstOwner = new OwnersData();
        firstOwner.firstName = "First1";
        firstOwner.lastName = "Last1";
        firstOwner.title = "CEO";
        firstOwner.email = "abc@qamail.com";
        firstOwner.DateOfBirth = "11-11-1988";
        firstOwner.sSN = "123545677";
        const firstOwnerAddress = new Address();
        firstOwnerAddress.streetAddress1 = "123 Main St.";
        firstOwnerAddress.city = "Downtown";
        firstOwnerAddress.state = "NJ";
        firstOwnerAddress.postalCode = "12345";
        firstOwnerAddress.country = "USA";
        firstOwner.ownerAddress = firstOwnerAddress;

        //Second Owner
        const secondOwner = new OwnersData();
        secondOwner.firstName = "First4";
        secondOwner.lastName = "Last4";
        secondOwner.title = "Director";
        secondOwner.email = "abc1@qamail.com";
        secondOwner.DateOfBirth = "11-11-1989";
        secondOwner.sSN = "123545677";
        const secondOwnerAddress = new Address();
        secondOwnerAddress.streetAddress1 = "123 Main St.";
        secondOwnerAddress.city = "Downtown";
        secondOwnerAddress.state = "NJ";
        secondOwnerAddress.postalCode = "12345";
        secondOwnerAddress.country = "USA";
        secondOwner.ownerAddress = secondOwnerAddress;
        ownersInformation.ownersList = [firstOwner, secondOwner]

        return ownersInformation;
    }

    public static GetCreditCardData(): CreditCardData {
        const card = new CreditCardData();
        card.number = "4111111111111111";
        card.expMonth = "12";
        card.expYear = "2025";
        card.cvn = "123";
        card.cardHolderName = "Joe Smith";
        return card;
    }

    public static GetACHData(): BankAccountData {
        const bankAccountInformation = new BankAccountData();
        bankAccountInformation.accountNumber = "123456789";
        bankAccountInformation.accountType = "C";
        bankAccountInformation.routingNumber = "102000076";
        return bankAccountInformation;
    }

    public static GetMailingAddress(): Address {
        const address = new Address();
        address.streetAddress1 = "123 Main St.";
        address.city = "Downtown";
        address.state = "NJ";
        address.postalCode = "12345";
        address.country = "USA";
        return address;
    }

    public static GetSecondaryBankAccountData(): BankAccountData {
        const bankAccountInformation = new BankAccountData();
        bankAccountInformation.accountCountryCode = "USA",
            bankAccountInformation.accountName = "MyBankAccount",
            bankAccountInformation.accountNumber = "123456788",
            bankAccountInformation.accountOwnershipType = "Personal",
            bankAccountInformation.accountType = "C",
            bankAccountInformation.routingNumber = "102000076"
            bankAccountInformation.bankName = "My Bank";
        return bankAccountInformation;
    }

    public static GetGrossBillingSettleData(): GrossBillingInformation {
        const grossBillingInformation = new GrossBillingInformation();
        const grossSettleBankData = new BankAccountData();
        grossSettleBankData.accountCountryCode = "USA";
        grossSettleBankData.accountName = "MyBankAccount";
        grossSettleBankData.accountNumber = "123456788";
        grossSettleBankData.accountOwnershipType = "Personal";
        grossSettleBankData.accountType = "C";
        grossSettleBankData.routingNumber = "102000076";
        grossSettleBankData.accountHolderName = "John";
        grossBillingInformation.grossSettleBankData = grossSettleBankData;
        const grossSettleAddress = new Address();
        grossSettleAddress.streetAddress1 = "123 Main St.";
        grossSettleAddress.city = "Downtown";
        grossSettleAddress.state = "NJ";
        grossSettleAddress.postalCode = "12345";
        grossSettleAddress.country = "USA";
        grossBillingInformation.grossSettleAddress = grossSettleAddress;
        const grossSettleCreditCardData = new CreditCardData();
        grossSettleCreditCardData.number = "4111111111111111";
        grossSettleCreditCardData.expMonth = "12";
        grossSettleCreditCardData.expYear = "2025";
        grossSettleCreditCardData.cvn = "123";
        grossSettleCreditCardData.cardHolderName = "Joe Smith";
        grossBillingInformation.grossSettleCreditCardData = grossSettleCreditCardData;
        return grossBillingInformation;
    }

    public static GetAccountPermissions(): AccountPermissions {
        const accountPermissions = new AccountPermissions();
        accountPermissions.cCProcessing = true;
        return accountPermissions;
    }

    public static GetRenewAccountDetails(): RenewAccountData {
        const renewAccountData = new RenewAccountData();
        renewAccountData.tier = "TestEIN";
        renewAccountData.zipCode = "12345";
        renewAccountData.creditCard = new CreditCardData();
        renewAccountData.creditCard.number = "4111111111111111";
        renewAccountData.creditCard.expMonth = '12';
        renewAccountData.creditCard.expYear = '2025';
        renewAccountData.creditCard.cvn = '123';
        renewAccountData.paymentBankAccountNumber = "123456789";
        renewAccountData.paymentBankRoutingNumber = "102000076";
        renewAccountData.paymentBankAccountType = "Checking";
        return renewAccountData;
    }

    public static GetDeviceData(numDeviceTypes: number = 1, withAttributes: boolean = true): DeviceData {
        const deviceTypes: Array<string> = ["PAX S500", "Secure Submit"];

        const deviceData = new DeviceData();
        deviceData.devices = Array<DeviceInfo>();

        for (let i = 0; i < numDeviceTypes; i++) {
            const deviceInfo = new DeviceInfo();
            if (i >= deviceTypes.length)
                break;
            deviceInfo.name = deviceTypes[i];
            deviceInfo.quantity = 1;
            if (withAttributes) {
                const deviceAtrributeInfo = new DeviceAttributeInfo();
                deviceAtrributeInfo.name = "Heartland.AMD.OfficeKey",
                    deviceAtrributeInfo.value = "123456"
                deviceInfo.attributes = [deviceAtrributeInfo];
            }
            deviceData.devices = [deviceInfo];
        }
        return deviceData;
    }

    public static GetDocumentBase64String(filepath: string) {
        return this.getByteArray(filepath);
    }

    private static getByteArray(filePath: string) {
        const fileData = fs.readFileSync(filePath);
        const buff = Buffer.from(fileData);
        const base64data = buff.toString('base64');
        return base64data;
    }

    public static getRandomInt(min: number, max: number): number {
        const floatRandom = Math.random()
        const difference = max - min;

        // random between 0 and the difference
        const random = Math.round(difference * floatRandom)
        const randomWithinRange = random + min

        return randomWithinRange;
    }
}