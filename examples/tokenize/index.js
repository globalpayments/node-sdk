const {
  ServicesConfig,
  ServicesContainer,
  CreditCardData,
  Address,
} = require("../../lib/src");

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
config.serviceUrl = "https://cert.api2.heartlandportico.com";

ServicesContainer.configure(config);

const card = new CreditCardData();
card.number = "4111111111111111";
card.expMonth = "12";
card.expYear = "2025";
card.cvn = "123";
card.cardHolderName = "Joe Smith";

const address = new Address();
address.postalCode = "12345";

card
  .tokenize()
  .withCurrency("USD")
  .withAddress(address)
  .execute()
  .then((response) => {
    console.log(response);

    const token = new CreditCardData();
    token.token = response.token;
    token.expMonth = "12";
    token.expYear = "2025";

    token
      .authorize(10)
      .withCurrency("USD")
      .execute()
      .then((authorization) => {
        console.log("auth:", authorization);
      })
      .catch((err) => console.log(err));
  })
  .catch((error) => console.log(error));
