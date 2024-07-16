import {
  CreditCardData,
  PorticoConfig,
  ServicesContainer,
} from "../../../../src";

const config = new PorticoConfig();

beforeAll(() => {
  config.secretApiKey = "skapi_cert_MXDMBQDwa3IAA4GV7NGMqQA_wFR3_TNeamFWoNUu_Q";
  ServicesContainer.configureService(config);
});

test("card tokenization then update expiry date", async () => {
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "10";
  card.expYear = "2020";
  card.cvn = "131";
  card.cardHolderName = "Megatron";
  const response = await card.tokenize().execute();
  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;
  const mdate = new Date();
  tokenizedCard.expMonth = (mdate.getMonth() + 2).toString().padStart(2, "0");
  tokenizedCard.expYear = (mdate.getFullYear() + 2).toString();

  const isTokenUpdated = await tokenizedCard.updateTokenExpiry();

  expect(isTokenUpdated).toBeTruthy();
});

test("Should delete tokenized card token", async () => {
  const card = new CreditCardData();
  card.number = "4263970000005262";
  card.expMonth = "10";
  card.expYear = "2020";
  card.cvn = "131";
  card.cardHolderName = "Tron";
  const response = await card.tokenize().execute();
  const tokenId = response.token;

  const tokenizedCard = new CreditCardData();
  tokenizedCard.token = tokenId;

  const isTokenDeleted = await tokenizedCard.deleteToken();

  expect(isTokenDeleted).toBe(true);
});
