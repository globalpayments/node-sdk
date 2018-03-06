const fs = require('fs');
const {json} = require('micro');
const {promisify} = require('util');
const {
  Address,
  CreditCardData,
  ServicesConfig,
  ServicesContainer,
  TransactionModifier,
} = require('globalpayments-api');

const readFileAsync = promisify(fs.readFile);

const showIndex = async (res) => {
  const html = await readFileAsync('index.html');
  res.end(html);
};

const configure = () => {
  const config = new ServicesConfig();
  config.merchantId = 'heartlandgpsandbox';
  config.accountId = 'apitest';
  config.sharedSecret = 'secret';
  config.serviceUrl = 'https://api.sandbox.realexpayments.com/epage-remote.cgi';
  ServicesContainer.configure(config);
}

module.exports = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await showIndex(res);
      break;
    case 'POST':
      // obtain request data
      const data = await json(req);

      // create payment request with gateway
      configure();

      const card = new CreditCardData();
      card.token = data.response.details.paymentMethodToken.token;
      card.mobileType = data.mobileType;

      const address = new Address();
      address.postalCode = data.response.details.cardInfo.billingAddress.postalCode;

      try {
        const payment = await card.charge('20.00')
          .withCurrency('USD')
          .withAddress(address)
          .withModifier(TransactionModifier.EncryptedMobile)
          .execute();

        res.end(JSON.stringify({
          error: false,
          response: payment,
        }));
      } catch (e) {
        console.log(e);
        res.end(JSON.stringify({
          error: true,
          exception: {
            code: e.code,
            message: e.message,
          },
        }));
      }
      break;
    default:
      res.end();
  }
};