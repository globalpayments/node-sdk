import {
  Address,
  AddressType,
  BuilderError,
  HostedPaymentConfig,
  HostedPaymentData,
  HostedService,
  HppVersion,
  Logger,
  SampleRequestLogger,
  ServicesContainer,
} from "../../../../src";
import { GpEcomConfig } from "../../../../src/ServiceConfigs";

const config = () => {
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
  return config;
};

const currency = "EUR";

const billingAddress = new Address();
billingAddress.streetAddress1 = "Flat 123";
billingAddress.streetAddress2 = "House 456";
billingAddress.postalCode = "50001";
billingAddress.country = "US";

const shippingAddress = new Address();
shippingAddress.streetAddress1 = "Flat 456";
shippingAddress.streetAddress2 = "House 123";
shippingAddress.postalCode = "WB3 A21";
shippingAddress.country = "GB";

beforeAll(() => {
  ServicesContainer.configureService(config());
});

const service = new HostedService(config());

const address = new Address();
address.postalCode = "123|56";
address.country = "IRELAND";

test("credit auth", () => {
  const json = service
    .authorize(1)
    .withCurrency("EUR")
    .withCustomerId("123456")
    .withAddress(address)
    .serialize();

  expect(json).toBeTruthy();
});

test("credit sale", () => {
  const json = service
    .charge(1)
    .withCurrency("EUR")
    .withCustomerId("123456")
    .withAddress(address)
    .serialize();

  expect(json).toBeTruthy();
});

test("credit verify", () => {
  const json = service
    .verify(1)
    .withCurrency("EUR")
    .withCustomerId("123456")
    .withAddress(address)
    .serialize();

  expect(json).toBeTruthy();
});

test("auth no amount", async () => {
  try {
    await service.authorize(undefined).withCurrency("USD").serialize();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});

test("auth no currency", async () => {
  try {
    await service.authorize(10).serialize();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});

test("sale no amount", async () => {
  try {
    await service.charge(undefined).withCurrency("USD").serialize();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});

test("sale no currency", async () => {
  try {
    await service.authorize(10).serialize();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});

test("verify no currency", async () => {
  try {
    await service.verify().serialize();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});

test("verify with amount", async () => {
  try {
    await service.verify().withAmount(10).serialize();
  } catch (error) {
    expect(error?.message).toBeTruthy();
    expect(error instanceof BuilderError).toBe(true);
  }
});

test("capture billing shipping info", async () => {
  const localConfig = config();
  localConfig.hostedPaymentConfig.version = HppVersion.Version2;

  const service = new HostedService(localConfig);

  const hostedPaymentData = new HostedPaymentData();
  hostedPaymentData.addressCapture = true;
  hostedPaymentData.notReturnAddress = false;
  hostedPaymentData.removeShipping = true;

  const json = await service
    .charge(19)
    .withCurrency(currency)
    .withAddress(billingAddress, AddressType.Billing)
    .withAddress(shippingAddress, AddressType.Shipping)
    .withHostedPaymentData(hostedPaymentData)
    .serialize();

  const response = JSON.parse(json);

  expect(response.HPP_CAPTURE_ADDRESS === "1").toBe(true);
  expect(response.HPP_DO_NOT_RETURN_ADDRESS === "0").toBe(true);
  expect(response.HPP_REMOVE_SHIPPING === "1").toBe(true);
});
