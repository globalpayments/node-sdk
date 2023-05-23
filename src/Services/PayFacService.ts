import { PayFacBuilder } from  "../Builders/PayFacBuilder";
import { TransactionType, 
        TransactionModifier 
} from "../Entities/Enums";

export class PayFacService {
    constructor() { }
      
    public createAccount() {
        return new PayFacBuilder(TransactionType.CreateAccount);
    }

    public editAccount() {
        return new PayFacBuilder(TransactionType.EditAccount);
    }

    public resetPassword() {
        return new PayFacBuilder(TransactionType.ResetPassword);
    }

    public renewAccount() {
        return new PayFacBuilder(TransactionType.RenewAccount);
    }

    public updateBeneficialOwnershipInfo() {
        return new PayFacBuilder(TransactionType.UpdateBeneficialOwnership);
    }

    public disownAccount() {
        return new PayFacBuilder(TransactionType.DisownAccount);
    }

    public uploadDocumentChargeback() {
        return new PayFacBuilder(TransactionType.UploadDocumentChargeback);
    }

    public uploadDocument() {
        return new PayFacBuilder(TransactionType.UploadDocument);
    }

    public obtainSSOKey() {
        return new PayFacBuilder(TransactionType.ObtainSSOKey);
    }

    public updateBankAccountOwnershipInfo() {
        return new PayFacBuilder(TransactionType.UpdateBankAccountOwnership);
    }

    public addFunds() {
        return new PayFacBuilder(TransactionType.AddFunds);
    }

    public sweepFunds() {
        return new PayFacBuilder(TransactionType.SweepFunds);
    }

    public addCardFlashFunds() {
        return new PayFacBuilder(TransactionType.AddCardFlashFunds);
    }

    public pushMoneyToFlashFundsCard() {
        return new PayFacBuilder(TransactionType.PushMoneyFlashFunds);
    }

    public disburseFunds() {
        return new PayFacBuilder(TransactionType.DisburseFunds);
    }

    public spendBack() {
        return new PayFacBuilder(TransactionType.SpendBack);
    }

    public reverseSplitPay() {
        return new PayFacBuilder(TransactionType.ReverseSplitPay);
    }

    public splitFunds() {
        return new PayFacBuilder(TransactionType.SplitFunds);
    }

    public getAccountDetails() {
        return new PayFacBuilder(TransactionType.GetAccountDetails);
    }

    public getAccountDetailsEnhanced() {
        return new PayFacBuilder(TransactionType.GetAccountDetails, TransactionModifier.Additional);
    }

    public getAccountBalance() {
        return new PayFacBuilder(TransactionType.GetAccountBalance);
    }   

    public orderDevice() {
        return new PayFacBuilder(TransactionType.OrderDevice);
    }
}