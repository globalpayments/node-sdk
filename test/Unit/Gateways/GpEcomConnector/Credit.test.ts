import {
  CreditCardData,
  ServicesContainer,
  UnsupportedTransactionError,
} from "../../../../src";
import { GpEcomConfig } from "../../../../src/ServiceConfigs";

const config = new GpEcomConfig();
config.merchantId = "heartlandgpsandbox";
config.accountId = "api";
config.sharedSecret = "secret";
config.serviceUrl = "https://api.sandbox.realexpayments.com/epage-remote.cgi";
config.rebatePassword = "rebate";
config.refundPassword = "refund";

const card = new CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.cardHolderName = "Joe Smith";

beforeAll(() => {
  ServicesContainer.configureService(config);
});

test("credit reverse", async () => {
  try {
    await card.reverse(15).withAllowDuplicates(true).execute();
  } catch (error) {
    expect(error).toBeInstanceOf(UnsupportedTransactionError);
    expect(error?.name).toBe("UnsupportedTransactionError");
    expect(
      -1 !==
        error?.message.indexOf(
          "selected gateway does not support this transaction type",
        ),
    ).toBe(true);
  }
});
