import ava, { ExecutionContext } from "ava";
import {
  Channel,
  DebitTrackData,
  EncryptionData,
  EntryMethod,
  ServicesContainer,
  Transaction,
  TransactionStatus,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../Data/BaseGpApiTestConfig";

const runSerially = true;
const test = runSerially ? ava.serial : ava;

const assertTransactionResponse = (
  t: ExecutionContext<unknown>,
  transaction: Transaction,
  responseCode: string,
  transactionStatus: TransactionStatus,
): void => {
  t.truthy(transaction);
  t.is(responseCode, transaction.responseCode);
  t.is(transactionStatus as string, transaction.responseMessage);
};

test.beforeEach(() => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardPresent),
  );
});

test("debit sale swipe", async (t) => {
  const card = new DebitTrackData();
  card.value =
    "%B4012002000060016^VI TEST CREDIT^251210118039000000000396?;4012002000060016=25121011803939600000?";
  card.pinBlock = "32539F50C245A6A93D123412324000AA";
  card.entryMethod = EntryMethod.Swipe;

  const response = await card
    .charge(18)
    .withCurrency("EUR")
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("debit refund swipe", async (t) => {
  const card = new DebitTrackData();
  card.value =
    "%B4012002000060016^VI TEST CREDIT^251210118039000000000396?;4012002000060016=25121011803939600000?";
  card.pinBlock = "32539F50C245A6A93D123412324000AA";
  card.entryMethod = EntryMethod.Swipe;

  const response = await card
    .refund(18)
    .withCurrency("EUR")
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("debit refund chip", async (t) => {
  const card = new DebitTrackData();
  card.setTrackData(
    "%B4012002000060016^VI TEST CREDIT^251210118039000000000396?;4012002000060016=25121011803939600000?",
  );
  card.entryMethod = EntryMethod.Swipe;

  const tagData =
    "9F4005F000F0A0019F02060000000025009F03060000000000009F2608D90A06501B48564E82027C005F3401019F360200029F0702FF009F0802008C9F0902008C9F34030403029F2701809F0D05F0400088009F0E0508000000009F0F05F0400098005F280208409F390105FFC605DC4000A800FFC7050010000000FFC805DC4004F8009F3303E0B8C89F1A0208409F350122950500000080005F2A0208409A031409109B02E8009F21030811539C01009F37045EED3A8E4F07A00000000310109F0607A00000000310108407A00000000310109F100706010A03A400029F410400000001";
  const response = await card
    .refund(18)
    .withCurrency("EUR")
    .withAllowDuplicates(true)
    .withTagData(tagData)
    .execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("debit reverse", async (t) => {
  const card = new DebitTrackData();
  card.setTrackData(
    "%B4012002000060016^VI TEST CREDIT^251210118039000000000396?;4012002000060016=25121011803939600000?",
  );
  card.pinBlock = "32539F50C245A6A93D123412324000AA";
  card.entryMethod = EntryMethod.Swipe;

  const transaction = await card
    .charge(18)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(
    t,
    transaction,
    "SUCCESS",
    TransactionStatus.CAPTURED,
  );

  const response = await transaction.reverse().withCurrency("USD").execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.REVERSED);
});

test("debit sale swipe encrypted", async (t) => {
  const card = new DebitTrackData();
  card.value =
    "%B4012002000060016^VI TEST CREDIT^251210118039000000000396?;4012002000060016=25121011803939600000?";
  card.pinBlock = "32539F50C245A6A93D123412324000AA";
  card.entryMethod = EntryMethod.Swipe;
  card.encryptionData = EncryptionData.version1();

  const response = await card
    .charge(18)
    .withCurrency("EUR")
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("debit sale swipe encrypted version 1", async (t) => {
  const card = new DebitTrackData();
  card.value =
    "&lt;E1050711%B4012001000000016^VI TEST CREDIT^251200000000000000000000?|LO04K0WFOmdkDz0um+GwUkILL8ZZOP6Zc4rCpZ9+kg2T3JBT4AEOilWTI|+++++++Dbbn04ekG|11;4012001000000016=25120000000000000000?|1u2F/aEhbdoPixyAPGyIDv3gBfF|+++++++Dbbn04ekG|00|||/wECAQECAoFGAgEH2wYcShV78RZwb3NAc2VjdXJlZXhjaGFuZ2UubmV0PX50qfj4dt0lu9oFBESQQNkpoxEVpCW3ZKmoIV3T93zphPS3XKP4+DiVlM8VIOOmAuRrpzxNi0TN/DWXWSjUC8m/PI2dACGdl/hVJ/imfqIs68wYDnp8j0ZfgvM26MlnDbTVRrSx68Nzj2QAgpBCHcaBb/FZm9T7pfMr2Mlh2YcAt6gGG1i2bJgiEJn8IiSDX5M2ybzqRT86PCbKle/XCTwFFe1X|&gt;";
  card.pinBlock = "32539F50C245A6A93D123412324000AA";
  card.entryMethod = EntryMethod.Swipe;
  card.encryptionData = EncryptionData.version1();

  const response = await card
    .charge(12)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("debit sale swipe chip", async (t) => {
  const card = new DebitTrackData();
  card.value = ";4024720012345671=30125025432198712345?";
  card.pinBlock = "32539F50C245A6A93D123412324000AA";
  card.entryMethod = EntryMethod.Swipe;
  const tagData =
    "82021C008407A0000002771010950580000000009A031709289C01005F280201245F2A0201245F3401019F02060000000010009F03060000000000009F080200019F090200019F100706010A03A420009F1A0201249F26089CC473F4A4CE18D39F2701809F3303E0F8C89F34030100029F3501229F360200639F370435EFED379F410400000019";

  const response = await card
    .charge(100)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withTagData(tagData)
    .execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("debit sale swipe chip contactless", async (t) => {
  const card = new DebitTrackData();
  card.value = ";4024720012345671=18125025432198712345?";
  card.pinBlock = "AFEC374574FC90623D010000116001EE";
  card.entryMethod = EntryMethod.Proximity;
  const tagData =
    "82021C008407A0000002771010950580000000009A031709289C01005F280201245F2A0201245F3401019F02060000000010009F03060000000000009F080200019F090200019F100706010A03A420009F1A0201249F26089CC473F4A4CE18D39F2701809F3303E0F8C89F34030100029F3501229F360200639F370435EFED379F410400000019";

  const response = await card
    .charge(100)
    .withCurrency("USD")
    .withAllowDuplicates(true)
    .withTagData(tagData)
    .execute();

  assertTransactionResponse(t, response, "SUCCESS", TransactionStatus.CAPTURED);
});

test("debit sale authorize then capture", async (t) => {
  const card = new DebitTrackData();
  card.value =
    "%B4012002000060016^VI TEST CREDIT^251210118039000000000396?;4012002000060016=25121011803939600000?";
  card.pinBlock = "32539F50C245A6A93D123412324000AA";
  card.entryMethod = EntryMethod.Swipe;

  const response = await card.authorize(10).withCurrency("USD").execute();

  assertTransactionResponse(
    t,
    response,
    "SUCCESS",
    TransactionStatus.PREAUTHORIZED,
  );

  const captureResponse = await response
    .capture(10)
    .withCurrency("USD")
    .execute();

  assertTransactionResponse(
    t,
    captureResponse,
    "SUCCESS",
    TransactionStatus.CAPTURED,
  );
});

test.afterEach(() => BaseGpApiTestConfig.resetGpApiConfig());
