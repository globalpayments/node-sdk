import ava from "ava";
import {
  CreditCardData,
  PorticoConfig,
  ServicesContainer,
} from "../../../../src/";

const config = new PorticoConfig();
config.secretApiKey = "skapi_cert_MY5OAAAQrmIF_IZDKbr1ecycRr7n1Q1SxNkVgzDhwg";
const runSerially = false;
const test = runSerially ? ava.serial : ava;

ava.before(() => {
  ServicesContainer.configureService(config);
});

test("Should Update tokenized card expiry date", async (t) => {
    t.plan(1);

    const card = new CreditCardData();
    card.number = "4263970000005262";
    card.expMonth = "10";
    card.expYear = "2020"
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

   t.true(isTokenUpdated);
  });

  test("Should delete tokenized card token", async (t) => {
    t.plan(1);

    const card = new CreditCardData();
    card.number = "4263970000005262";
    card.expMonth = "10";
    card.expYear = "2020"
    card.cvn = "131";
    card.cardHolderName = "Tron";
    const response = await card.tokenize().execute();
    const tokenId = response.token;
  
    const tokenizedCard = new CreditCardData();
    tokenizedCard.token = tokenId;
  
    const isTokenDeleted = await tokenizedCard.deleteToken();

    t.true(isTokenDeleted);
  });
