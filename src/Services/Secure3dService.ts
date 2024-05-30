import { Secure3dBuilder } from "../";
import { ThreeDSecure, TransactionType } from "../Entities";
import { PaymentMethod } from "../PaymentMethods";

export class Secure3dService {
  static checkEnrollment(paymentMethod: PaymentMethod): Secure3dBuilder {
    return new Secure3dBuilder(
      TransactionType.VerifyEnrolled,
    ).withPaymentMethod(paymentMethod);
  }

  static initiateAuthentication(
    paymentMethod: PaymentMethod,
    secureEcom: ThreeDSecure,
  ): Secure3dBuilder {
    if (paymentMethod.isSecure3d) {
      paymentMethod.threeDSecure = secureEcom;
    }
    return new Secure3dBuilder(
      TransactionType.InitiateAuthentication,
    ).withPaymentMethod(paymentMethod);
  }

  static getAuthenticationData(): Secure3dBuilder {
    return new Secure3dBuilder(TransactionType.VerifySignature);
  }
}
