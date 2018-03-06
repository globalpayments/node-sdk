import ava from "ava";
import {
  EcommerceChannel,
  EcommerceInfo,
  ServicesConfig,
  ServicesContainer,
} from "../../../../src/";
import { TestCards } from "../../../Data";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
config.serviceUrl = "https://cert.api2.heartlandportico.com";
const runSerially = false;
const test = runSerially ? ava.serial : ava;

const card = TestCards.visaManual();

ava.before((_t) => {
  ServicesContainer.configure(config);
});

test("ecom with moto", async (t) => {
  t.plan(2);

  const ecom = new EcommerceInfo();
  ecom.channel = EcommerceChannel.Moto;

  const response = await card
    .charge(9)
    .withCurrency("USD")
    .withEcommerceInfo(ecom)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("ecom with direct market ship date", async (t) => {
  t.plan(2);

  const ecom = new EcommerceInfo();
  ecom.shipDay = "25";
  ecom.shipMonth = "12";

  const response = await card
    .charge(9)
    .withCurrency("USD")
    .withEcommerceInfo(ecom)
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("ecom with direct market invoice no ship date", async (t) => {
  t.plan(2);

  const response = await card
    .charge(9)
    .withCurrency("USD")
    .withEcommerceInfo(new EcommerceInfo())
    .withInvoiceNumber("1234567890")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("ecom with direct market invoice and ship date", async (t) => {
  t.plan(2);

  const ecom = new EcommerceInfo();
  ecom.channel = EcommerceChannel.Moto;

  const response = await card
    .charge(9)
    .withCurrency("USD")
    .withEcommerceInfo(ecom)
    .withInvoiceNumber("1234567890")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});

test("ecom with secure ecommerce", async (t) => {
  t.plan(2);

  const ecom = new EcommerceInfo();
  ecom.paymentDataSource = "ApplePay";
  ecom.cavv = "XXXXf98AAajXbDRg3HSUMAACAAA=";
  ecom.eci = "5";

  const response = await card
    .charge(9)
    .withCurrency("USD")
    .withEcommerceInfo(ecom)
    .withInvoiceNumber("1234567890")
    .withAllowDuplicates(true)
    .execute();

  t.truthy(response);
  t.is(response.responseCode, "00");
});
