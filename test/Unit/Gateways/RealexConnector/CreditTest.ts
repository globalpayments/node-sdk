import test from "ava";
import {
  CreditCardData,
  ServicesConfig,
  ServicesContainer,
  UnsupportedTransactionError,
} from "../../../../src/";

const config = new ServicesConfig();
config.merchantId = "realexsandbox";
config.accountId = "internet";
config.sharedSecret = "Po8lRRT67a";
config.serviceUrl = "https://test.realexpayments.com/epage-remote.cgi";

const card = new CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.cardHolderName = "Joe Smith";

test.before((_t) => {
  ServicesContainer.configure(config);
});

test("credit reverse", (t) => {
  const error = t.throws(() => {
    return card
      .reverse(15)
      .withAllowDuplicates(true)
      .execute();
  }, UnsupportedTransactionError);

  t.is(error.name, "UnsupportedTransactionError");
  t.true(
    -1 !==
      error.message.indexOf(
        "selected gateway does not support this transaction type",
      ),
  );
});
