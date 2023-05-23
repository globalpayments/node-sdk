import test from "ava";
import { PayFacService } from "../../../../src/Services/PayFacService";
import {
  ServicesConfig, ServicesContainer
} from "../../../../src/";
import { TestFundsData } from "./TestData/TestFundsData";

const config = new ServicesConfig();
config.serviceUrl = "https://xmltest.propay.com/API/PropayAPI.aspx";
config.certificationStr = "5dbacb0fc504dd7bdc2eadeb7039dd";
config.terminalID = "7039dd";
config.x509CertificationPath = "test/Integration/Gateways/ProPayConnector/TestData/selfSignedCertificate.crt";
config.x509CertificateString = "MIICpDCCAYygAwIBAgIIS7Y5fijJytIwDQYJKoZIhvcNAQENBQAwETEPMA0GA1UEAwwGUFJPUEFZMB4XDTE5MDkxOTAwMDAwMFoXDTI5MDkxOTAwMDAwMFowEzERMA8GA1UEAwwIMTI3LjAuMDEwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCCwvq2ho43oeeGX3L9+2aD7bna7qjdLwWumeIpwhPZLa44MeQ5100wy4W2hKk3pOb5yaHqyhzoHDriveQnq/EpZJk9m7sizXsxZtBHtt+wghSZjdNhnon3R54SH5J7oEPybRSAKXSEzHjN+kCu7W3TmXSLve6YuODnjUpbOcAsHG2wE+zpCoEbe8toH5Tt7g8HzEc5mJYkkILTq6j9pwDE50r2NVbV3SXwmQ1ifxf54Z9EFB5bQv5cI3+GL/VwlQeJdiKMGj1rs8zTR8TjbAjVlJbz6bBkFItUsqexgwAHIJZAaU7an8ZamGRlPjf6dp3mOEu4B47igNj5KOSgCNdRAgMBAAEwDQYJKoZIhvcNAQENBQADggEBAF88u367yrduqd3PfEIo2ClaI2QPRIIWKKACMcZDl3z1BzVzNFOZNG2vLcSuKnGRH89tJPCjyxdJa0RyDTkXMSLqb5FgUseEjmj3ULAvFqLZNW35PY9mmlmCY+S3CC/bQR4iyPLo8lsRq0Nl6hlvB440+9zS8UQjtc2957QgcXfD427UJb698gXzsfQcNeaQWy8pNm7FzDfHTJbo/t6FOpmfR+RMZky9FrlWabInkrkf3w2XJL0uUAYU9jGQa+l/vnZD2KNzs1mO1EqkS6yB/fsn85mkgGe4Vfbo9GQ/S+KmDujewFA0ma7O03fy1W5v6Amn/nAcFTCddVL3BDNEtOM=";
const _service = new PayFacService();

test.before((_t) => {
  ServicesContainer.configure(config);
});

test("add funds", async (t) => {
  t.plan(2);
  var response = await _service.addFunds()
    .withAccountNumber("718134204")
    .withAmount("100")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("sweep funds", async (t) => {
  t.plan(2);
  var response = await _service.sweepFunds()
    .withAccountNumber("718136438")
    .withAmount("10")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("add flash funds payment card", async (t) => {
  t.plan(2);
  var response = await _service.addCardFlashFunds()
    .withAccountNumber("718134204")
    .withFlashFundsPaymentCardData(TestFundsData.GetFlashFundsPaymentCardData())
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});

test("push money to flash funds card", async (t) => {
  t.plan(2);
  var response = await _service.pushMoneyToFlashFundsCard()
    .withAccountNumber("718134204")
    .withAmount("100")
    .execute();

  t.truthy(response);
  t.is("00", response.responseCode);
});