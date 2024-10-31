const fs = require("fs");
const { json } = require("micro");
const { promisify } = require("util");
const bodyParser = require("body-parser");
const {
  CreditCardData,
  ServicesContainer,
  PaymentDataSourceType,
  MobilePaymentMethodType,
  PorticoConfig,
  GatewayError,
} = require("globalpayments-api");

const configure = () => {
  const config = new PorticoConfig();
  config.secretApiKey = "skapi_cert_MeHOBQDccnIA8S6ECUes8HNT8v9cuUvQIsJdKZ8pwA";
  config.developerId = "000000";
  config.versionNumber = "0000";
  config.serviceUrl = "https://cert.api2.heartlandportico.com";
  ServicesContainer.configureService(config);
};

exports.processToken = async (req, res) => {
  // obtain request data
  const data = await json(req);

  // create payment request with gateway
  configure();

  const card = new CreditCardData();
  card.token = data.token;
  card.mobileType = MobilePaymentMethodType.GOOGLEPAY;
  card.paymentSource = PaymentDataSourceType.GOOGLEPAYWEB;

  try {
    const payment = card
      .charge("1.00")
      .withCurrency("USD")
      .execute()
      .then((result) => {
        res.send(
          JSON.stringify({
            message: 'Google Pay token processed succesfully',
            error: false,
            responseCode: result.responseCode,
            authCode: result.transactionReference.authCode,
            txnID: result.transactionId
            
          }),
        );
      }).catch( e =>{
        if (e instanceof GatewayError) {
          res.send(
            JSON.stringify({
              error: true,
              message: e.message,
              code: e.responseCode              
            }),
          );
        }
      })
      
  } catch (e) {    
    console.log(e);
    res.end(
      JSON.stringify({
        error: true,
        exception: {
          code: e.code,
          message: e.message,
        },
      }),
    );
  }
};
