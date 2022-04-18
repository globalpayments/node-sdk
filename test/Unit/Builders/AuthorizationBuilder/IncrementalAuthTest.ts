import test from "ava";
import {
    CreditCardData,
    ServicesConfig,
    ServicesContainer,
    Transaction,
    TransactionModifier,
} from "../../../../src/";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
config.serviceUrl = "https://cert.api2-c.heartlandportico.com";

const card = new CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.cardHolderName = "Joe Smith";

test.before((_t) => {
    ServicesContainer.configure(config);
});

test("incrementalAuth amount", (t) => {
    t.plan(3);
    const amount = 10;
    const response = Transaction.fromId("123333").incrementalAuth(amount);
    t.truthy(response);
    t.is(response.amount, amount);
    t.is(response.transactionModifier, TransactionModifier.Incremental);
});
