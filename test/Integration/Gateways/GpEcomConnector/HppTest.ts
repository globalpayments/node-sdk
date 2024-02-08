import ava from "ava";
import {
  Address,
  BuilderError,
  HostedPaymentConfig,
  HostedService,
  Logger,
  SampleRequestLogger,
  ServicesContainer,
} from "../../../../src/";
import { GpEcomConfig } from "../../../../src/ServiceConfigs";

const config = new GpEcomConfig();
config.merchantId = "heartlandgpsandbox";
config.accountId = "api";
config.sharedSecret = "secret";
config.rebatePassword = "rebate";
config.refundPassword = "refund";
config.requestLogger = new SampleRequestLogger(new Logger("logs"));

config.hostedPaymentConfig = new HostedPaymentConfig();
config.hostedPaymentConfig.language = "GB";
config.hostedPaymentConfig.responseUrl = "http://requestb.in/10q2bjb1";
const test = ava.serial;

test.before(() => {
  ServicesContainer.configureService(config);
});

const service = new HostedService(config);

const address = new Address();
address.postalCode = "123|56";
address.country = "IRELAND";

test("credit auth", (t) => {
  t.plan(1);

  const json = service
    .authorize(1)
    .withCurrency("EUR")
    .withCustomerId("123456")
    .withAddress(address)
    .serialize();

  t.truthy(json);
});

test("credit sale", (t) => {
  t.plan(1);

  const json = service
    .charge(1)
    .withCurrency("EUR")
    .withCustomerId("123456")
    .withAddress(address)
    .serialize();

  t.truthy(json);
});

test("credit verify", (t) => {
  t.plan(1);

  const json = service
    .verify(1)
    .withCurrency("EUR")
    .withCustomerId("123456")
    .withAddress(address)
    .serialize();

  t.truthy(json);
});

test("auth no amount", (t) => {
  t.plan(2);

  const error = t.throws(() => {
    service.authorize(undefined).withCurrency("USD").serialize();
  }, new BuilderError("amount cannot be null for this transaction type."));

  t.truthy(error?.message);
});

test("auth no currency", (t) => {
  t.plan(2);

  const error = t.throws(() => {
    service.authorize(10).serialize();
  }, new BuilderError("currency cannot be null for this transaction type."));

  t.truthy(error?.message);
});

test("sale no amount", (t) => {
  t.plan(2);

  const error = t.throws(() => {
    service.charge(undefined).withCurrency("USD").serialize();
  }, new BuilderError("amount cannot be null for this transaction type."));

  t.truthy(error?.message);
});

test("sale no currency", (t) => {
  t.plan(2);

  const error = t.throws(() => {
    service.authorize(10).serialize();
  }, new BuilderError("currency cannot be null for this transaction type."));

  t.truthy(error?.message);
});

test("verify no currency", (t) => {
  t.plan(2);

  const error = t.throws(() => {
    service.verify().serialize();
  }, new BuilderError("amount cannot be null for this transaction type."));

  t.truthy(error?.message);
});

test("verify with amount", (t) => {
  t.plan(2);

  const error = t.throws(() => {
    service.verify().withAmount(10).serialize();
  }, new BuilderError("currency cannot be null for this transaction type."));

  t.truthy(error?.message);
});
