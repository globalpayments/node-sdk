/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 */
define(["SuiteScripts/Honeycomb Mfg/globalpayments.api", "N/log"], function(
  GP,
  log,
) {
  function execute(context) {
    var config = new GP.ServicesConfig();
    config.secretApiKey =
      "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
    config.serviceUrl = "https://cert.api2.heartlandportico.com";

    GP.ServicesContainer.configure(config);

    var card = new GP.CreditCardData();
    card.number = "4111111111111111";
    card.expMonth = "12";
    card.expYear = "2025";
    card.cvn = "123";
    card.cardHolderName = "Joe Smith";

    card
      .authorize("14")
      .withCurrency("USD")
      .withAllowDuplicates(true)
      .execute()
      .then(function(authorization) {
        log.debug(authorization);
        return authorization;
      });
  }

  return {
    execute: execute,
  };
});
