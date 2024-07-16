import {
  Channel,
  CreditCardData,
  CvnPresenceIndicator,
  GatewayError,
  ServicesContainer,
  TransactionStatus,
} from "../../../../src";
import { BaseGpApiTestConfig } from "../../../Data";

const date = new Date();

const currency = "USD";

beforeAll(() => {
  ServicesContainer.configureService(
    BaseGpApiTestConfig.gpApiSetupConfig(Channel.CardNotPresent),
  );
});

function initCreditCardData({
  cardNumber,
  cvn,
  cardHolderName,
}: {
  cardNumber: any;
  cvn: any;
  cardHolderName: any;
}) {
  const card = new CreditCardData();
  card.number = cardNumber;
  card.expMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  card.expYear = (date.getFullYear() + 1).toString();
  card.cvn = cvn;
  card.cvnPresenceIndicator = CvnPresenceIndicator.Present;
  card.cardHolderName = cardHolderName;

  return card;
}

//#region Credit Card SUCCESS

test("CreditCard Visa Success", async () => {
  const card = initCreditCardData({
    cardNumber: "4263970000005262",
    cvn: "123",
    cardHolderName: "John Doe",
  });

  const response = await card
    .charge(14.99)
    .withCurrency(currency)
    .withDescription("CreditCard_Visa_Success")
    .execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect("VISA").toBe(response.cardType);
  expect(TransactionStatus.CAPTURED as string).toBe(response.responseMessage);
});

test("CreditCard MasterCard Success", async () => {
  const card = initCreditCardData({
    cardNumber: "5425230000004415",
    cvn: "123",
    cardHolderName: "John Smith",
  });

  const response = await card
    .charge(4.95)
    .withCurrency(currency)
    .withDescription("CreditCard MasterCard Success")
    .execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect("MASTERCARD").toBe(response.cardType);
  expect(TransactionStatus.CAPTURED as string).toBe(response.responseMessage);
});

test("CreditCard AmericanExpress Success", async () => {
  const card = initCreditCardData({
    cardNumber: "374101000000608",
    cvn: "1234",
    cardHolderName: "Susan Jones",
  });

  const response = await card
    .charge(10.25)
    .withCurrency(currency)
    .withDescription("CreditCard AmericanExpress Success")
    .execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect("AMEX").toBe(response.cardType);
  expect(TransactionStatus.CAPTURED as string).toBe(response.responseMessage);
});

test("CreditCard DinersClub Success", async () => {
  const card = initCreditCardData({
    cardNumber: "36256000000725",
    cvn: "789",
    cardHolderName: "Mark Green",
  });

  const response = await card
    .charge(5.15)
    .withCurrency(currency)
    .withDescription("CreditCard DinersClub Success")
    .execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect("DINERS").toBe(response.cardType);
  expect(TransactionStatus.CAPTURED as string).toBe(response.responseMessage);
});

test("CreditCard Discover Success", async () => {
  const card = initCreditCardData({
    cardNumber: "6011000000000087",
    cvn: "456",
    cardHolderName: "Mark Green",
  });

  const response = await card
    .charge(5.15)
    .withCurrency(currency)
    .withDescription("CreditCard Discover Success")
    .execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect("DISCOVER").toBe(response.cardType);
  expect(TransactionStatus.CAPTURED as string).toBe(response.responseMessage);
});

test("CreditCard JCB Success", async () => {
  const card = initCreditCardData({
    cardNumber: "3566000000000000",
    cvn: "223",
    cardHolderName: "Mark Green",
  });

  const response = await card
    .charge(1.88)
    .withCurrency(currency)
    .withDescription("CreditCard JCB Success")
    .execute();

  expect(response).toBeTruthy();
  expect("SUCCESS").toBe(response.responseCode);
  expect("JCB").toBe(response.cardType);
  expect(TransactionStatus.CAPTURED as string).toBe(response.responseMessage);
});

//#endregion .

//#region Credit Card Visa DECLINED

test("CreditCard VISA Declined 101", async () => {
  const card = initCreditCardData({
    cardNumber: "4000120000001154",
    cvn: "123",
    cardHolderName: "John Doe",
  });

  const response = await card
    .charge(1.88)
    .withCurrency(currency)
    .withDescription("CreditCard VISA Declined 101")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("VISA").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

test("CreditCard VISA Declined 102", async () => {
  const card = initCreditCardData({
    cardNumber: "4000130000001724",
    cvn: "123",
    cardHolderName: "Mark Doe",
  });

  const response = await card
    .charge(3.75)
    .withCurrency(currency)
    .withDescription("CreditCard VISA Declined 102")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("VISA").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

test("CreditCard VISA Declined 103", async () => {
  const card = initCreditCardData({
    cardNumber: "4000160000004147",
    cvn: "123",
    cardHolderName: "Bob Smith",
  });

  const response = await card
    .charge(1.88)
    .withCurrency(currency)
    .withDescription("CreditCard VISA Declined 103")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("VISA").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

test("CreditCard VISA Declined 111", async () => {
  const card = initCreditCardData({
    cardNumber: "4242420000000091",
    cvn: "123",
    cardHolderName: "Bob Doe",
  });

  const response = await card
    .charge(2.25)
    .withCurrency(currency)
    .withDescription("CreditCard VISA Declined 111")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("VISA").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

//#endregion

//#region Credit Card Mastercard DECLINED

test("CreditCard Mastercard Declined 101", async () => {
  const card = initCreditCardData({
    cardNumber: "5114610000004778",
    cvn: "123",
    cardHolderName: "Bob Howard",
  });

  const response = await card
    .charge(3.11)
    .withCurrency(currency)
    .withDescription("CreditCard Mastercard Declined 101")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("MASTERCARD").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

test("CreditCard Mastercard Declined 102", async () => {
  const card = initCreditCardData({
    cardNumber: "5114630000009791",
    cvn: "123",
    cardHolderName: "Mark Doe",
  });

  const response = await card
    .charge(3.75)
    .withCurrency(currency)
    .withDescription("CreditCard Mastercard Declined 102")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("MASTERCARD").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

test("CreditCard Mastercard Declined 103", async () => {
  const card = initCreditCardData({
    cardNumber: "5121220000006921",
    cvn: "123",
    cardHolderName: "Bob Smith",
  });

  const response = await card
    .charge(1.88)
    .withCurrency(currency)
    .withDescription("CreditCard Mastercard Declined 103")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("MASTERCARD").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

test("CreditCard Mastercard Declined 111", async () => {
  const card = initCreditCardData({
    cardNumber: "5100000000000131",
    cvn: "123",
    cardHolderName: "Mark Spencer",
  });

  const response = await card
    .charge(2.25)
    .withCurrency(currency)
    .withDescription("CreditCard Mastercard Declined 111")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("MASTERCARD").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

//#endregion

//#region Credit Card American Express DECLINED

test("CreditCard AmericanExpress Declined 101", async () => {
  const card = initCreditCardData({
    cardNumber: "376525000000010",
    cvn: "1234",
    cardHolderName: "Bob Howard",
  });

  const response = await card
    .charge(3.11)
    .withCurrency(currency)
    .withDescription("CreditCard AmericanExpress Declined 101")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("AMEX").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

test("CreditCard AmericanExpress Declined 102", async () => {
  const card = initCreditCardData({
    cardNumber: "375425000000907",
    cvn: "1234",
    cardHolderName: "Mark Doe",
  });

  const response = await card
    .charge(3.75)
    .withCurrency(currency)
    .withDescription("CreditCard AmericanExpress Declined 102")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("AMEX").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

test("CreditCard AmericanExpress Declined 103", async () => {
  const card = initCreditCardData({
    cardNumber: "343452000000306",
    cvn: "1234",
    cardHolderName: "Bob Smith",
  });

  const response = await card
    .charge(1.88)
    .withCurrency(currency)
    .withDescription("CreditCard AmericanExpress Declined 103")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("AMEX").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

test("CreditCard AmericanExpress Declined 111", async () => {
  const card = initCreditCardData({
    cardNumber: "374205502001004",
    cvn: "1234",
    cardHolderName: "Mark Spencer",
  });

  const response = await card
    .charge(2.25)
    .withCurrency(currency)
    .withDescription("CreditCard AmericanExpress Declined 111")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("AMEX").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

//#endregion

//#region Credit Card DinersClub DECLINED

test("CreditCard DinersClub Declined 101", async () => {
  const card = initCreditCardData({
    cardNumber: "36256000000998",
    cvn: "123",
    cardHolderName: "Bob Howard",
  });

  const response = await card
    .charge(3.11)
    .withCurrency(currency)
    .withDescription("CreditCard DinersClub Declined 101")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("DINERS").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

test("CreditCard DinersClub Declined 102", async () => {
  const card = initCreditCardData({
    cardNumber: "36256000000634",
    cvn: "123",
    cardHolderName: "Mark Doe",
  });

  const response = await card
    .charge(3.75)
    .withCurrency(currency)
    .withDescription("CreditCard DinersClub Declined 102")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("DINERS").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

test("CreditCard DinersClub Declined 103", async () => {
  const card = initCreditCardData({
    cardNumber: "38865000000705",
    cvn: "123",
    cardHolderName: "Bob Smith",
  });

  const response = await card
    .charge(1.88)
    .withCurrency(currency)
    .withDescription("CreditCard DinersClub Declined 103")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("DINERS").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

//#endregion

//#region Credit Card Discover DECLINED

test("CreditCard Discover Declined 101", async () => {
  const card = initCreditCardData({
    cardNumber: "6011000000001010",
    cvn: "123",
    cardHolderName: "Bob Howard",
  });

  const response = await card
    .charge(3.11)
    .withCurrency(currency)
    .withDescription("CreditCard Discover Declined 101")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("DISCOVER").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

test("CreditCard Discover Declined 102", async () => {
  const card = initCreditCardData({
    cardNumber: "6011000000001028",
    cvn: "123",
    cardHolderName: "Mark Doe",
  });

  const response = await card
    .charge(3.75)
    .withCurrency(currency)
    .withDescription("CreditCard Discover Declined 102")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("DISCOVER").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

test("CreditCard Discover Declined 103", async () => {
  const card = initCreditCardData({
    cardNumber: "6011000000001036",
    cvn: "123",
    cardHolderName: "Bob Smith",
  });

  const response = await card
    .charge(1.88)
    .withCurrency(currency)
    .withDescription("CreditCard Discover Declined 103")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("DISCOVER").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

//#endregion

//#region Credit Card JCB DECLINED

test("CreditCard JCB Declined 101", async () => {
  const card = initCreditCardData({
    cardNumber: "3566000000001016",
    cvn: "123",
    cardHolderName: "Bob Howard",
  });

  const response = await card
    .charge(3.11)
    .withCurrency(currency)
    .withDescription("CreditCard JCB Declined 101")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("JCB").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

test("CreditCard JCB Declined 102", async () => {
  const card = initCreditCardData({
    cardNumber: "3566000000001024",
    cvn: "123",
    cardHolderName: "Mark Doe",
  });

  const response = await card
    .charge(3.75)
    .withCurrency(currency)
    .withDescription("CreditCard JCB Declined 102")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("JCB").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

test("CreditCard JCB Declined 103", async () => {
  const card = initCreditCardData({
    cardNumber: "3566000000001032",
    cvn: "123",
    cardHolderName: "Bob Smith",
  });

  const response = await card
    .charge(1.88)
    .withCurrency(currency)
    .withDescription("CreditCard JCB Declined 103")
    .execute();

  expect(response).toBeTruthy();
  expect("DECLINED").toBe(response.responseCode);
  expect("JCB").toBe(response.cardType);
  expect(TransactionStatus.DECLINED as string).toBe(response.responseMessage);
});

//#endregion

//#region Credit Card Visa ERROR

test("CreditCard Visa Processing Error", async () => {
  const card = initCreditCardData({
    cardNumber: "4009830000001985",
    cvn: "123",
    cardHolderName: "Bob Smith",
  });

  try {
    await card
      .charge(1.88)
      .withCurrency(currency)
      .withDescription("CreditCard Visa Processing Error")
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "Status Code: SYSTEM_ERROR_DOWNSTREAM - 205,Timeout error—Action failed unexpectedly. An automatic reversal will happen if charged. Please retry the transaction..",
    );
    expect(error?.responseCode).toBe("50013");
    expect(error).toBeInstanceOf(GatewayError);
  }
});

test("CreditCard Visa Processing Error Wrong Currency", async () => {
  //Failing:
  const card = initCreditCardData({
    cardNumber: "4009830000001985",
    cvn: "123",
    cardHolderName: "Bob Smith",
  });

  try {
    await card
      .charge(1.88)
      .withCurrency("XXX")
      .withDescription("CreditCard Visa Processing Error")
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "Status Code: SYSTEM_ERROR_DOWNSTREAM - currency card combination not allowed",
    );
    expect(error?.responseCode).toBe("50024");
    expect(error).toBeInstanceOf(GatewayError);
  }
});

//#endregion

//#region Credit Card Mastercard ERROR

test("CreditCard Mastercard Processing Error", async () => {
  const card = initCreditCardData({
    cardNumber: "5135020000005871",
    cvn: "123",
    cardHolderName: "Bob Smith",
  });

  try {
    await card
      .charge(1.88)
      .withCurrency(currency)
      .withDescription("CreditCard Mastercard Processing Error")
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "Status Code: SYSTEM_ERROR_DOWNSTREAM - 205,Timeout error—Action failed unexpectedly. An automatic reversal will happen if charged. Please retry the transaction..",
    );
    expect(error?.responseCode).toBe("50013");
    expect(error).toBeInstanceOf(GatewayError);
  }
});

//#endregion

//#region Credit Card AmericanExpress ERROR

test("CreditCard AmericanExpress Processing Error", async () => {
  const card = initCreditCardData({
    cardNumber: "372349000000852",
    cvn: "1234",
    cardHolderName: "Bob Smith",
  });

  try {
    await card
      .charge(1.88)
      .withCurrency(currency)
      .withDescription("CreditCard AmericanExpress Processing Error")
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "Status Code: SYSTEM_ERROR_DOWNSTREAM - 205,Timeout error—Action failed unexpectedly. An automatic reversal will happen if charged. Please retry the transaction..",
    );
    expect(error?.responseCode).toBe("50013");
    expect(error).toBeInstanceOf(GatewayError);
  }
});

//#endregion

//#region Credit Card DinersClub ERROR

test("CreditCard DinersClub Processing Error", async () => {
  const card = initCreditCardData({
    cardNumber: "30450000000985",
    cvn: "123",
    cardHolderName: "Bob Smith",
  });

  try {
    await card
      .charge(1.88)
      .withCurrency(currency)
      .withDescription("CreditCard DinersClub Processing Error")
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "Status Code: SYSTEM_ERROR_DOWNSTREAM - 200,eCom error—Developers are notified",
    );
    expect(error?.responseCode).toBe("50013");
    expect(error).toBeInstanceOf(GatewayError);
  }
});

//#endregion

//#region Credit Card Discover ERROR

test("CreditCard Discover Processing Error", async () => {
  const card = initCreditCardData({
    cardNumber: "6011000000002000",
    cvn: "123",
    cardHolderName: "Bob Smith",
  });

  try {
    await card
      .charge(1.88)
      .withCurrency(currency)
      .withDescription("CreditCard Discover Processing Error")
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "Status Code: SYSTEM_ERROR_DOWNSTREAM - 200,eCom error—Developers are notified",
    );
    expect(error?.responseCode).toBe("50013");
    expect(error).toBeInstanceOf(GatewayError);
  }
});

//#endregion

//#region Credit Card JCB ERROR

test("CreditCard JCB Processing Error", async () => {
  const card = initCreditCardData({
    cardNumber: "3566000000002006",
    cvn: "123",
    cardHolderName: "Bob Smith",
  });

  try {
    await card
      .charge(1.88)
      .withCurrency(currency)
      .withDescription("CreditCard JCB Processing Error")
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "Status Code: SYSTEM_ERROR_DOWNSTREAM - 200,eCom error—Developers are notified",
    );
    expect(error?.responseCode).toBe("50013");
    expect(error).toBeInstanceOf(GatewayError);
  }
});

//#endregion

//#region Credit Card UATP ERROR

test("CreditCard UATP Transaction Not Supported Error", async () => {
  const card = initCreditCardData({
    cardNumber: "135400000007187",
    cvn: "123",
    cardHolderName: "Bob Smith",
  });

  try {
    await card
      .charge(1.88)
      .withCurrency(currency)
      .withDescription("CreditCard UATP Transaction Not Supported Error")
      .execute();
  } catch (error) {
    expect(error).toBeTruthy();
    expect(error?.message).toBe(
      "Status Code: INVALID_REQUEST_DATA - Transaction not supported Please contact support ",
    );
    expect(error?.responseCode).toBe("50020");
    expect(error).toBeInstanceOf(GatewayError);
  }
});

//#endregion
afterAll(() => BaseGpApiTestConfig.resetGpApiConfig());
