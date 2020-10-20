import { IPaymentMethod, PaymentMethodType } from "../";
export declare abstract class PaymentMethod implements IPaymentMethod {
    paymentMethodType: PaymentMethodType;
    [key: string]: any;
    readonly isAuthable: boolean;
    readonly isBalanceable: boolean;
    readonly isCardData: boolean;
    readonly isChargable: boolean;
    readonly isEditable: boolean;
    readonly isEncryptable: boolean;
    readonly isPinProtected: boolean;
    readonly isPrePayable: boolean;
    readonly isRefundable: boolean;
    readonly isReversable: boolean;
    readonly isTokenizable: boolean;
    readonly isTrackData: boolean;
    readonly isVerifyable: boolean;
    readonly isVoidable: boolean;
}
