import {
  ApiError,
  AuthorizationBuilder,
  GenerationUtils,
  PaymentMethodType,
  ServicesConfig,
  ServicesContainer,
  StringUtils,
  Transaction,
  TransactionReference,
  TransactionType,
} from "../";

export class HostedService {
  protected config: ServicesConfig;

  constructor(config: ServicesConfig) {
    this.config = config;
    ServicesContainer.configure(config);
  }

  public authorize(amount?: number | string) {
    return new AuthorizationBuilder(TransactionType.Auth).withAmount(amount);
  }

  public charge(amount?: number | string) {
    return new AuthorizationBuilder(TransactionType.Sale).withAmount(amount);
  }

  public verify(amount?: number | string) {
    return new AuthorizationBuilder(TransactionType.Verify).withAmount(amount);
  }

  public parseResponse(json: string, encoded = true) {
    const response = JSON.parse(json);
    const decoder = encoded ? StringUtils.atob : (t: string) => t;

    const timestamp = decoder(response.TIMESTAMP);
    const merchantId = decoder(response.MERCHANT_ID);
    const orderId = decoder(response.ORDER_ID);
    const result = decoder(response.RESULT);
    const message = decoder(response.MESSAGE);
    const transactionId = decoder(response.PASREF);
    const authCode = decoder(response.AUTHCODE);

    const sha1Hash = decoder(response.SHA1HASH);
    const hash = GenerationUtils.generateHash(
      [
        timestamp,
        merchantId,
        orderId,
        result,
        message,
        transactionId,
        authCode,
      ].join("."),
      this.config.sharedSecret,
    );

    if (hash !== sha1Hash) {
      throw new ApiError(
        "Incorrect hash. Please check your code and the Developers Documentation.",
      );
    }

    const transaction = new Transaction();
    transaction.authorizedAmount = decoder(response.AMOUNT);
    transaction.cvnResponseCode = decoder(response.CVNRESULT);
    transaction.responseCode = result;
    transaction.responseMessage = message;
    transaction.avsResponseCode = decoder(response.AVSPOSTCODERESULT);
    transaction.transactionReference = new TransactionReference();
    transaction.transactionReference.authCode = authCode;
    transaction.transactionReference.orderId = orderId;
    transaction.transactionReference.paymentMethodType =
      PaymentMethodType.Credit;
    transaction.transactionReference.transactionId = transactionId;
    return transaction;
  }
}
