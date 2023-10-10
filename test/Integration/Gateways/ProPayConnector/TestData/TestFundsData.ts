import { CreditCardData } from "../../../../../src/PaymentMethods";
import { Address } from "../../../../../src/Entities/Address";
import { FlashFundsPaymentCardData } from "../../../../../src/Entities/ProFac/FlashFundsPaymentCardData";

export class TestFundsData {
    public static GetFlashFundsPaymentCardData(): FlashFundsPaymentCardData {
        const cardData = new FlashFundsPaymentCardData();
        const creditCard = new CreditCardData();
        creditCard.number = "4895142232120006";
        creditCard.expMonth = "10";
        creditCard.expYear = "2025";
        creditCard.cvn = "022";
        creditCard.cardHolderName = "Clint Eastwood";
        cardData.creditCard = creditCard;
        const cardholderAddress = new Address();
        cardholderAddress.streetAddress1 = "900 Metro Center Blv";
        cardholderAddress.city = "San Fransisco";
        cardholderAddress.state = "CA";
        cardholderAddress.postalCode = "94404";
        cardholderAddress.country = "USA";
        cardData.cardholderAddress = cardholderAddress;
        return cardData;
    }
}