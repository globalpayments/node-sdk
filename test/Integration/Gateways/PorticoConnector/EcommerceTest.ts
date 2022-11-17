import ava from "ava";
import {
  EcommerceChannel,
  EcommerceInfo,
  MobilePaymentMethodType,
  PaymentDataSourceType,
  ServicesConfig,
  ServicesContainer,
} from "../../../../src/";
import { TestCards } from "../../../Data";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MY5OAAAQrmIF_IZDKbr1ecycRr7n1Q1SxNkVgzDhwg";
config.serviceUrl = "https://cert.api2.heartlandportico.com";

const runSerially = false;
const test = runSerially ? ava.serial : ava;

const card = TestCards.visaManual();
card.tokenize();

ava.before((_t) => {
  ServicesContainer.configure(config);  
});
 
 test("ecom with moto", async (t) => {
  t.plan(4);

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
  t.truthy(response.batchId);
  t.truthy(response.batchSeqNbr);
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
  ecom.shipDay="25";
  ecom.shipMonth="12";

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

test("ecom with walletdata", async (t) => {
  t.plan(2);  
  card.mobileType = MobilePaymentMethodType.GOOGLEPAY;
  card.paymentSource = PaymentDataSourceType.GOOGLEPAYWEB;
  card.token="{\"signature\":\"MEYCIQChbD9dizRQSTaboSQmp3GD3TSSKLd8kupbOr0IlL+AVgIhAKAbqM0PPn7WPTXZf7nXJPqq29h0hTQiRfusScTToLg8\",\"protocolVersion\":\"ECv1\",\"signedMessage\":\"{\\\"encryptedMessage\\\":\\\"S3P/E0IEZ32pUM1u737Susaj2kQst7cAXUw1bK7Lp9VM8GEqXTD6uaSCKSggFwhV9XNnOMvt9QYgEY69PHc5EFJBR4n9cB6QGrVjARGbUtANTXgSSJy08FFYwjFQ+/CqkHllY3JpnNjGsY5lny5cimatjkB4laTqIZv05mqc0KIzb4aUSfYQzukx6hfmDRDdrEGOfrKHiSx2EOkBguJ7r69BwcBAq58SL6Wpuvh99d8MJyhGSZLyozpD4gmhEVpyDZX5vdG5k6V0e6O6/Y53RPsnaKOH5nourzCLBMm28YBUY8TcqGY/TzRr7SNBDTXkem339CPlRYrFJNYhPRYJcutcf/Akfcrrj9NMBUMQ+Ab4bzbbcAyR/mneNGoWh/W5HFW7n8aYieZwFO2Of8TMOaUxLqpMyZv2UTguCHfSQdSKHt/fv9JxKPszlF0JuGkZmiv7ONDEaw\\\\u003d\\\\u003d\\\",\\\"ephemeralPublicKey\\\":\\\"BE0mGDo9yPUYbC7ERwX3JBNmnyRXRvJ9Nwj/N7B5VE+aN3yKe5UcCgUi8eUfJCwapGu0C8Rf2/9y4+rIY+72s0c\\\\u003d\\\",\\\"tag\\\":\\\"SBp7NAyNPgZ7lfyi8lIFGbo8S1sf/6ADqOqD1ZYT6y0\\\\u003d\\\"}\"}";
  const response = await card
    .charge(10)
    .withCurrency("USD")    
    .withInvoiceNumber("1234567890")
    .withAllowDuplicates(true)
    .execute();
  t.truthy(response);
  t.is(response.responseCode, "00");
});