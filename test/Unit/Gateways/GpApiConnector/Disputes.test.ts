import {
  Action,
  DataServiceCriteria,
  DisputeDocument,
  DisputeSortProperty,
  DisputeStage,
  DisputeStatus,
  DisputeSummary,
  GpApiConfig,
  GpApiConnector,
  GpApiMapping,
  Logger,
  ReportType,
  ReportingService,
  SampleRequestLogger,
  SearchCriteria,
  SortDirection,
  StringUtils,
  Transaction,
} from "../../../../src";
import { GpApiManagementRequestBuilder } from "../../../../src/Builders/RequestBuilder/GpApi/GpApiManagementRequestBuilder";
import { GpApiReportRequestBuilder } from "../../../../src/Builders/RequestBuilder/GpApi/GpApiReportRequestBuilder";

const time = "2026-09-01T10:24:43.999Z";
const content = "RXZpZGVuY2U=";
const action = {
  id: "ACT_test",
  type: "DISPUTE_SINGLE",
  time_created: time,
  result_code: "SUCCESS",
  app_id: "APP_test",
  app_name: "Disputes test",
};
const document = {
  id: "DOC_test",
  type: "SALES_RECEIPT",
  b64_content: content,
};
const response = {
  id: "DIS_test",
  merchant_id: "MER_test",
  merchant_name: "Platform merchant",
  account_id: "DIA_test",
  account_name: "dispute_management",
  time_created: time,
  status: "WITH_MERCHANT",
  status_time_created: time,
  stage: "CHARGEBACK",
  stage_time_created: time,
  amount: "11099",
  currency: "USD",
  payer_amount: "1999",
  payer_currency: "USD",
  merchant_amount: "2099",
  merchant_currency: "EUR",
  reason_code: "FRAUD",
  reason_description: "Disputed purchase",
  time_to_respond_by: time,
  result: "PENDING",
  investigator_comment: "Review evidence",
  funding_type: "DEBIT",
  deposit_time_created: time,
  deposit_id: "DEP_test",
  system: {
    mid: "123456",
    tid: "987654",
    hierarchy: "111-23",
    name: "System merchant",
    dba: "Trading name",
    global_transaction_reference: "global-reference",
    global_transaction_source: "gp-apigee",
  },
  last_adjustment_amount: "1999",
  last_adjustment_currency: "USD",
  last_adjustment_funding: "DEBIT",
  last_adjustment_time_created: time,
  net_financial_amount: "3999",
  net_financial_currency: "USD",
  net_financial_funding: "DEBIT",
  foreign_issued_card: "YES",
  disposition_description: "Response sent to issuer",
  disposition_date: time,
  case_time_created: time,
  store_reference: "6",
  region_code: "NA",
  acquirer_code: "GPN",
  payment_method_provider: [
    {
      comment: "Goods not received",
      reference: "CASE_test",
      documents: [document],
    },
  ],
  transaction: {
    time_created: time,
    type: "SALE",
    amount: "11099",
    currency: "USD",
    reference: "transaction-reference",
    remarks: "Transaction remarks",
    terminal_capability_code: "E00808",
    merchant_category_code: "5999",
    provider: { avs_result: "Y" },
    payment_method: {
      entry_mode_code: "81",
      card: {
        number: "411111******1111",
        arn: "123456789012345",
        brand: "VISA",
        authcode: "123456",
        brand_reference: "brand-reference",
        issuer_bin: "411111",
        acquirer_bin: "1234",
        funding: "CREDIT",
        issuer: "Issuer bank",
      },
    },
    order: { reference: "order-reference", invoice_number: "1234" },
  },
  documents: [document],
  device: { terminal_capacity_code: "1" },
  action,
};

describe("GP-API disputes request fields", () => {
  const config = new GpApiConfig();
  config.requestLogger = new SampleRequestLogger(new Logger("logs"));
  const requestBuilder = new GpApiReportRequestBuilder();

  test("list sends every documented query field", () => {
    const builder = ReportingService.findDisputesPaged(1, 10).orderBy(
      DisputeSortProperty.Id,
      SortDirection.Desc,
    );
    builder
      .where(SearchCriteria.AquirerReferenceNumber, "123456789012345")
      .andWith(SearchCriteria.CardBrand, "VISA")
      .andWith(SearchCriteria.DisputeStatus, DisputeStatus.WithMerchant)
      .andWith(SearchCriteria.DisputeStage, DisputeStage.Chargeback)
      .andWith(DataServiceCriteria.StartStageDate, new Date(2026, 8, 1))
      .andWith(DataServiceCriteria.EndStageDate, new Date(2026, 8, 30))
      .andWith(DataServiceCriteria.MerchantId, "123456")
      .andWith(DataServiceCriteria.SystemHierarchy, "111-23")
      .andWith(SearchCriteria.DepositId, "DEP_test")
      .andWith(SearchCriteria.OrderReference, "order-reference")
      .andWith(SearchCriteria.AcquirerCode, "GPN");
    const request = requestBuilder.buildRequest(builder as any, config);
    expect(request.httpVerb).toBe("GET");
    expect(request.endpoint).toBe("/disputes");
    expect(request.queryParams).toEqual({
      page: 1,
      page_size: 10,
      order_by: "id",
      order: "DESC",
      arn: "123456789012345",
      brand: "VISA",
      status: "WITH_MERCHANT",
      stage: "CHARGEBACK",
      from_stage_time_created: "2026-09-01",
      to_stage_time_created: "2026-09-30",
      "system.mid": "123456",
      "system.hierarchy": "111-23",
      deposit_id: "DEP_test",
      "order.reference": "order-reference",
      acquirer_code: "GPN",
    });
  });

  test("detail and document use the supplied path IDs", () => {
    const detail = requestBuilder.buildRequest(
      ReportingService.disputeDetail("DIS_test") as any,
      config,
    );
    expect(detail.endpoint).toBe("/disputes/DIS_test");
    expect(detail.httpVerb).toBe("GET");
    const download = requestBuilder.buildRequest(
      ReportingService.documentDisputeDetail("DIS_test").withDisputeDocumentId(
        "DOC_test",
      ) as any,
      config,
    );
    expect(download.endpoint).toBe("/disputes/DIS_test/documents/DOC_test");
    expect(download.httpVerb).toBe("GET");
  });

  test("accept and challenge keep the existing request contract", () => {
    const dispute = new DisputeSummary();
    dispute.caseId = "DIS_test";
    const management = new GpApiManagementRequestBuilder();
    const accept = management.buildRequest(
      dispute.accept().withIdempotencyKey("accept-test"),
    );
    expect(accept.endpoint).toBe("/disputes/DIS_test/acceptance");
    expect(accept.httpVerb).toBe("POST");
    expect(accept.requestBody).toBe("");
    const evidence = new DisputeDocument();
    evidence.b64Content = content;
    evidence.type = "SALES_RECEIPT";
    const challenge = management.buildRequest(
      dispute.challenge([evidence]).withIdempotencyKey("challenge-test"),
    );
    expect(challenge.endpoint).toBe("/disputes/DIS_test/challenge");
    expect(challenge.httpVerb).toBe("POST");
    expect(JSON.parse(challenge.requestBody!)).toEqual({
      documents: [{ b64_content: content, type: "SALES_RECEIPT" }],
    });
  });

  test("challenge body for sandbox cases: multiple, missing type, empty", () => {
    const management = new GpApiManagementRequestBuilder();
    const dispute = new DisputeSummary();
    dispute.caseId = "DIS_SAND_abcd1241";
    const make = (type?: string) => {
      const doc = new DisputeDocument();
      doc.b64Content = "R0lGODlhigPCAXAAACwAAAAAigPCAYf///8AQnv";
      if (type) {
        doc.type = type;
      }
      return doc;
    };
    const multiple = management.buildRequest(
      dispute.challenge([make("SALES_RECEIPT"), make("TERMS_AND_CONDITIONS")]),
    );
    expect(multiple.endpoint).toBe("/disputes/DIS_SAND_abcd1241/challenge");
    expect(JSON.parse(multiple.requestBody!).documents).toEqual([
      { b64_content: make().b64_content, type: "SALES_RECEIPT" },
      { b64_content: make().b64_content, type: "TERMS_AND_CONDITIONS" },
    ]);
    const noType = management.buildRequest(dispute.challenge([make()]));
    expect(JSON.parse(noType.requestBody!).documents).toEqual([
      { b64_content: make().b64_content },
    ]);
    const empty = management.buildRequest(dispute.challenge([]));
    expect(JSON.parse(empty.requestBody!)).toEqual({ documents: [] });
  });
});

describe("GP-API disputes response fields", () => {
  test("detail maps every documented field without conflating merchant identifiers", () => {
    const result = GpApiMapping.mapDisputeSummary(response);
    expect(result).toBeInstanceOf(DisputeSummary);
    expect(result).toMatchObject({
      caseId: "DIS_test",
      merchantId: "MER_test",
      platformMerchantName: "Platform merchant",
      accountId: "DIA_test",
      accountName: "dispute_management",
      caseIdTime: new Date(time),
      caseStageTime: new Date(time),
      caseStatusTime: new Date(time),
      caseStatus: "WITH_MERCHANT",
      caseStage: "CHARGEBACK",
      caseAmount: "110.99",
      caseCurrency: "USD",
      disputeCustomerAmount: 19.99,
      disputeCustomerCurrency: "USD",
      merchantAmount: "20.99",
      merchantCurrency: "EUR",
      reasonCode: "FRAUD",
      reason: "Disputed purchase",
      respondByDate: new Date(time),
      result: "PENDING",
      investigatorComment: "Review evidence",
      fundingType: "DEBIT",
      depositDate: new Date(time),
      depositReference: "DEP_test",
      caseMerchantId: "123456",
      caseTerminalId: "987654",
      merchantHierarchy: "111-23",
      merchantName: "System merchant",
      merchantDbaName: "Trading name",
      globalTransactionReference: "global-reference",
      globalTransactionSource: "gp-apigee",
      lastAdjustmentAmount: "19.99",
      lastAdjustmentCurrency: "USD",
      lastAdjustmentFunding: "DEBIT",
      lastAdjustmentTimeCreated: new Date(time),
      netFinancialAmount: "39.99",
      netFinancialCurrency: "USD",
      netFinancialFunding: "DEBIT",
      foreignIssuedCard: "YES",
      dispositionDescription: "Response sent to issuer",
      dispositionDate: new Date(time),
      caseTime: new Date(time),
      storeReference: "6",
      regionCode: "NA",
      acquirerCode: "GPN",
      transactionTime: new Date(time),
      transactionType: "SALE",
      transactionAmount: "110.99",
      transactionCurrency: "USD",
      transactionReferenceNumber: "transaction-reference",
      transactionRemarks: "Transaction remarks",
      transactionTerminalCapabilityCode: "E00808",
      transactionMerchantCategoryCode: "5999",
      transactionAvsResult: "Y",
      transactionEntryModeCode: "81",
      transactionMaskedCardNumber: "411111******1111",
      transactionARN: "123456789012345",
      transactionCardType: "VISA",
      transactionAuthCode: "123456",
      transactionBrandReference: "brand-reference",
      transactionIssuerBin: "411111",
      transactionAcquirerBin: "1234",
      transactionCardFunding: "CREDIT",
      transactionCardIssuer: "Issuer bank",
      transactionOrderId: "order-reference",
      transactionInvoiceNumber: "1234",
      terminalCapacityCode: "1",
    });
    expect(result.documents[0]).toBeInstanceOf(DisputeDocument);
    expect(result.documents[0]).toMatchObject(document);
    expect(result.paymentMethodProvider[0]).toMatchObject(
      response.payment_method_provider[0],
    );
    expect(result.action).toEqual(
      Object.assign(new Action(), {
        id: action.id,
        type: action.type,
        timeCreated: time,
        resultCode: "SUCCESS",
        appId: action.app_id,
        appName: action.app_name,
      }),
    );
  });

  test("list maps paging, scope, filter, action and disputes", () => {
    const list = GpApiMapping.mapReportResponse(
      {
        total_record_count: 0,
        current_page_size: 1,
        merchant_id: "MER_test",
        merchant_name: "Platform merchant",
        account_id: "DIA_test",
        account_name: "dispute_management",
        filter: { stage: "CHARGEBACK" },
        paging: { page: 1, page_size: 10, order: "DESC", order_by: "id" },
        disputes: [response],
        action,
      },
      ReportType.FindDisputesPaged,
    ) as any;
    expect(list).toMatchObject({
      totalRecordCount: 0,
      currentPageSize: 1,
      merchantId: "MER_test",
      merchantName: "Platform merchant",
      accountId: "DIA_test",
      accountName: "dispute_management",
      filter: { stage: "CHARGEBACK" },
      page: 1,
      pageSize: 10,
      order: "DESC",
      orderBy: "id",
      action: { resultCode: "SUCCESS" },
    });
    expect(list.result[0]).toEqual(GpApiMapping.mapDisputeSummary(response));
  });

  test("download exposes both compatible content names", () => {
    const result = GpApiMapping.mapDisputeDocument({
      id: "DOC_test",
      b64_content: content,
    });
    expect(result.id).toBe("DOC_test");
    expect(result.b64Content).toBe(content);
    expect(result.b64_content).toBe(content);
  });

  test("optional fields do not produce invalid dates", () => {
    const result = GpApiMapping.mapDisputeSummary({
      id: "DIS_test",
      transaction: { order: { reference: "order" } },
    });
    expect(result.respondByDate).toBeUndefined();
    expect(result.transactionTime).toBeUndefined();
    expect(result.caseStageTime).toBeNull();
    expect(result.action).toBeNull();
  });

  test("maps provider-nested card, empty adjustments and issuer fields", () => {
    const result = GpApiMapping.mapDisputeSummary({
      id: "DIS_SAND_abcd1234",
      time_created: "2020-11-12T18:50:39.721Z",
      merchant_id: "MER_62251730c5574bbcb268191b5f315de8",
      status: "WITH_MERCHANT",
      status_time_created: "2020-11-14T18:50:39.721Z",
      stage: "RETRIEVAL",
      amount: "1000",
      currency: "USD",
      reason_code: "104",
      reason_description: "Other Fraud-Card Absent Environment",
      time_to_respond_by: "2020-11-29T18:50:39.722Z",
      result: "PENDING",
      system: { mid: "627384967", hierarchy: "111-23-099-001-001" },
      last_adjustment_amount: "",
      last_adjustment_currency: "",
      last_adjustment_funding: "",
      payment_method_provider: [
        {
          comment: "issuer comments 34523",
          reference: "issuer-reference-0001",
        },
      ],
      transaction: {
        type: "SALE",
        amount: "1000",
        currency: "USD",
        reference: "my-trans-AAA1",
        order: { reference: "ORD-555" },
        provider: {
          payment_method: {
            card: {
              number: "424242xxxxxx4242",
              arn: "834523482349123",
              brand: "VISA",
              authcode: "234AB",
              brand_reference: "23423421342323A",
            },
          },
        },
      },
    });
    expect(result).toMatchObject({
      caseMerchantId: "627384967",
      merchantHierarchy: "111-23-099-001-001",
      lastAdjustmentAmount: "0",
      transactionMaskedCardNumber: "424242xxxxxx4242",
      transactionARN: "834523482349123",
      transactionCardType: "VISA",
      transactionAuthCode: "234AB",
      transactionBrandReference: "23423421342323A",
      transactionOrderId: "ORD-555",
      issuerComment: ["issuer comments 34523"],
      issuerCaseNumber: ["issuer-reference-0001"],
    });
  });

  test("without system falls back to top-level merchant and keeps zero amounts", () => {
    const result = GpApiMapping.mapDisputeSummary({
      id: "DIS_SAND_zero_case",
      merchant_id: "MER_001",
      merchant_name: "Test Merchant",
      amount: "1000",
      currency: "USD",
      payer_amount: "0",
      payer_currency: "USD",
      merchant_amount: "0",
      merchant_currency: "USD",
      net_financial_amount: "0",
      net_financial_currency: "USD",
      net_financial_funding: "CREDIT",
    });
    expect(result).toMatchObject({
      caseMerchantId: "MER_001",
      merchantId: "MER_001",
      platformMerchantName: "Test Merchant",
      merchantName: "Test Merchant",
      merchantHierarchy: null,
      merchantDbaName: null,
      caseTerminalId: null,
      disputeCustomerAmount: 0,
      merchantAmount: "0",
      netFinancialAmount: "0",
      merchantCurrency: "USD",
      netFinancialCurrency: "USD",
      netFinancialFunding: "CREDIT",
    });
  });

  test("MapDisputeSummaryTest (raw JSON, same payload)", () => {
    const rawJson =
      '{"id":"DIS_SAND_abcd1234","time_created":"2020-11-12T18:50:39.721Z","merchant_id":"MER_62251730c5574bbcb268191b5f315de8","merchant_name":"TEST MERCHANT","account_id":"DIA_882c832d13e04185bb6e213d6303ed98","account_name":"testdispute","status":"WITH_MERCHANT","status_time_created":"2020-11-14T18:50:39.721Z","stage":"RETRIEVAL","stage_time_created":"2020-11-17T18:50:39.722Z","amount":"1000","currency":"USD","payer_amount":"1000","payer_currency":"USD","merchant_amount":"1000","merchant_currency":"USD","reason_code":"104","reason_description":"Other Fraud-Card Absent Environment","time_to_respond_by":"2020-11-29T18:50:39.722Z","result":"PENDING","investigator_comment":"WITH_MERCHANT RETRIEVAL PENDING 1000 USD 1000 USD","system":{"mid":"11112334","tid":"22229876","hierarchy":"000-00-000-000-000","name":"MERCHANT ABC INC.","dba":"MERCHANT XYZ INC."},"last_adjustment_amount":"","last_adjustment_currency":"","last_adjustment_funding":"","last_adjustment_time_created":"2020-11-20T18:50:39.722Z","net_financial_amount":"","net_financial_currency":"","net_financial_funding":"","payment_method_provider":[{"comment":"issuer comments 34523","reference":"issuer-reference-0001","documents":[{"id":"DOC_MyEvidence_234234AVCDE-1"}]}],"transaction":{"time_created":"2020-10-05T18:50:39.726Z","type":"SALE","amount":"1000","currency":"USD","reference":"my-trans-AAA1","remarks":"my-trans-AAA1","payment_method":{"card":{"number":"424242xxxxxx4242","arn":"834523482349123","brand":"VISA","authcode":"234AB","brand_reference":"23423421342323A"}}},"documents":[],"action":{"id":"ACT_5blBTHnIs4aOCIvGwG7KizYUpsGI0g","type":"DISPUTE_SINGLE","time_created":"2020-11-24T18:50:39.925Z","result_code":"SUCCESS","app_id":"JF2GQpeCrOivkBGsTRiqkpkdKp67Gxi0","app_name":"test_app"}}';
    const doc = JSON.parse(rawJson);

    const dispute = GpApiMapping.mapDisputeSummary(doc);

    const card = doc.transaction?.payment_method?.card;
    expect(dispute.caseId).toBe(doc.id);
    expect(dispute.caseIdTime).toEqual(new Date(doc.time_created));
    expect(dispute.caseStatus).toBe(doc.status);
    expect(dispute.caseStage).toBe(doc.stage);
    expect(dispute.caseAmount).toBe(StringUtils.toAmount(doc.amount));
    expect(dispute.caseCurrency).toBe(doc.currency);
    expect(dispute.reasonCode).toBe(doc.reason_code);
    expect(dispute.reason).toBe(doc.reason_description);
    expect(dispute.respondByDate).toEqual(new Date(doc.time_to_respond_by));
    expect(dispute.result).toBe(doc.result);
    expect(dispute.caseMerchantId).toBe(doc.system?.mid);
    expect(dispute.caseTerminalId).toBe(doc.system?.tid);
    expect(dispute.merchantHierarchy).toBe(doc.system?.hierarchy);
    expect(dispute.merchantName).toBe(doc.system?.name);
    expect(dispute.merchantDbaName).toBe(doc.system?.dba);
    expect(dispute.lastAdjustmentAmount).toBe(
      StringUtils.toAmount(doc.last_adjustment_amount),
    );
    expect(dispute.lastAdjustmentCurrency).toBe(doc.last_adjustment_currency);
    expect(dispute.lastAdjustmentFunding).toBe(doc.last_adjustment_funding);
    expect(dispute.transactionMaskedCardNumber).toBe(card?.number);
    expect(dispute.transactionARN).toBe(card?.arn);
    expect(dispute.transactionCardType).toBe(card?.brand);
  });

  test("MapDisputeSummaryTest_NullDate (raw JSON, same payload )", () => {
    const rawJson =
      '{"id":"DIS_SAND_abcd1234","time_created":"","merchant_id":"MER_62251730c5574bbcb268191b5f315de8","merchant_name":"TEST MERCHANT","account_id":"DIA_882c832d13e04185bb6e213d6303ed98","account_name":"testdispute","status":"WITH_MERCHANT","status_time_created":"","stage":"RETRIEVAL","stage_time_created":"","amount":"1000","currency":"USD","payer_amount":"1000","payer_currency":"USD","merchant_amount":"1000","merchant_currency":"USD","reason_code":"104","reason_description":"Other Fraud-Card Absent Environment","time_to_respond_by":"","result":"PENDING","investigator_comment":"WITH_MERCHANT RETRIEVAL PENDING 1000 USD 1000 USD","system":{"mid":"11112334","tid":"22229876","hierarchy":"000-00-000-000-000","name":"MERCHANT ABC INC.","dba":"MERCHANT XYZ INC."},"last_adjustment_amount":"","last_adjustment_currency":"","last_adjustment_funding":"","last_adjustment_time_created":"","net_financial_amount":"","net_financial_currency":"","net_financial_funding":"","payment_method_provider":[{"comment":"issuer comments 34523","reference":"issuer-reference-0001","documents":[{"id":"DOC_MyEvidence_234234AVCDE-1"}]}],"transaction":{"time_created":"","type":"SALE","amount":"1000","currency":"USD","reference":"my-trans-AAA1","remarks":"my-trans-AAA1","payment_method":{"card":{"number":"424242xxxxxx4242","arn":"834523482349123","brand":"VISA","authcode":"234AB","brand_reference":"23423421342323A"}}},"documents":[],"action":{"id":"ACT_5blBTHnIs4aOCIvGwG7KizYUpsGI0g","type":"DISPUTE_SINGLE","time_created":"","result_code":"SUCCESS","app_id":"JF2GQpeCrOivkBGsTRiqkpkdKp67Gxi0","app_name":"test_app"}}';
    const doc = JSON.parse(rawJson);

    const dispute = GpApiMapping.mapDisputeSummary(doc);

    const card = doc.transaction?.payment_method?.card;
    expect(dispute.caseId).toBe(doc.id);
    expect(dispute.caseIdTime).toBeNull();
    expect(dispute.caseStatus).toBe(doc.status);
    expect(dispute.caseStage).toBe(doc.stage);
    expect(dispute.caseAmount).toBe(StringUtils.toAmount(doc.amount));
    expect(dispute.caseCurrency).toBe(doc.currency);
    expect(dispute.reasonCode).toBe(doc.reason_code);
    expect(dispute.reason).toBe(doc.reason_description);
    expect(dispute.respondByDate ?? null).toBeNull();
    expect(dispute.result).toBe(doc.result);
    expect(dispute.caseMerchantId).toBe(doc.system?.mid);
    expect(dispute.caseTerminalId).toBe(doc.system?.tid);
    expect(dispute.merchantHierarchy).toBe(doc.system?.hierarchy);
    expect(dispute.merchantName).toBe(doc.system?.name);
    expect(dispute.merchantDbaName).toBe(doc.system?.dba);
    expect(dispute.lastAdjustmentAmount).toBe(
      StringUtils.toAmount(doc.last_adjustment_amount),
    );
    expect(dispute.lastAdjustmentCurrency).toBe(doc.last_adjustment_currency);
    expect(dispute.lastAdjustmentFunding).toBe(doc.last_adjustment_funding);
    expect(dispute.transactionTime ?? null).toBeNull();
    expect(dispute.transactionMaskedCardNumber).toBe(card?.number);
    expect(dispute.transactionARN).toBe(card?.arn);
    expect(dispute.transactionCardType).toBe(card?.brand);
  });

  test("MapSettlementDisputeSummaryTest (raw JSON, same payload )", () => {
    const rawJson =
      '{"id":"DIS_812","status":"FUNDED","stage":"CHARGEBACK","stage_time_created":"2021-03-16T14:03:44","amount":"200","currency":"GBP","reason_code":"PM","reason_description":"Paid by Other Means","time_to_respond_by":"2021-04-02T14:03:44","result":"LOST","funding_type":"DEBIT","deposit_time_created":"2021-03-20","deposit_id":"DEP_2342423443","last_adjustment_amount":"","last_adjustment_currency":"","last_adjustment_funding":"","last_adjustment_time_created":"","system":{"mid":"11112334","tid":"22229876","hierarchy":"000-00-000-000-000","name":"MERCHANT ABC INC.","dba":"MERCHANT XYZ INC."},"transaction":{"time_created":"2021-02-21T14:03:44","merchant_time_created":"2021-02-21T16:03:44","type":"SALE","amount":"200","currency":"GBP","reference":"28012076eb6M","payment_method":{"card":{"masked_number_first6last4":"379132XXXXX1007","arn":"71400011203688701393903","brand":"AMEX","authcode":"129623","brand_reference":"MWE1P0JG80110"}}}}';
    const doc = JSON.parse(rawJson);

    const dispute = GpApiMapping.mapDisputeSummary(doc);

    const transaction = doc.transaction;
    const card = transaction?.payment_method?.card;
    expect(dispute.caseId).toBe(doc.id);
    expect(dispute.caseIdTime).toEqual(new Date(doc.stage_time_created));
    expect(dispute.caseStatus).toBe(doc.status);
    expect(dispute.caseStage).toBe(doc.stage);
    expect(dispute.caseAmount).toBe(StringUtils.toAmount(doc.amount));
    expect(dispute.caseCurrency).toBe(doc.currency);
    expect(dispute.lastAdjustmentAmount).toBe(
      StringUtils.toAmount(doc.last_adjustment_amount),
    );
    expect(dispute.lastAdjustmentCurrency).toBe(doc.last_adjustment_currency);
    expect(dispute.lastAdjustmentFunding).toBe(doc.last_adjustment_funding);
    expect(dispute.caseMerchantId).toBe(doc.system?.mid);
    expect(dispute.caseTerminalId).toBe(doc.system?.tid);
    expect(dispute.merchantHierarchy).toBe(doc.system?.hierarchy);
    expect(dispute.merchantName).toBe(doc.system?.name);
    expect(dispute.merchantDbaName).toBe(doc.system?.dba);
    expect(dispute.reasonCode).toBe(doc.reason_code);
    expect(dispute.reason).toBe(doc.reason_description);
    expect(dispute.result).toBe(doc.result);
    expect(dispute.transactionTime).toEqual(
      new Date(transaction?.time_created),
    );
    expect(dispute.transactionType).toBe(transaction?.type);
    expect(dispute.transactionAmount).toBe(
      StringUtils.toAmount(transaction?.amount),
    );
    expect(dispute.transactionCurrency).toBe(transaction?.currency);
    expect(dispute.transactionReferenceNumber).toBe(transaction?.reference);
    expect(dispute.transactionMaskedCardNumber).toBe(
      card?.masked_number_first6last4,
    );
    expect(dispute.transactionARN).toBe(card?.arn);
    expect(dispute.transactionCardType).toBe(card?.brand);
    expect(dispute.transactionAuthCode).toBe(card?.authcode);
    expect(dispute.respondByDate).toEqual(new Date(doc.time_to_respond_by));
    expect(dispute.depositDate).toEqual(new Date(doc.deposit_time_created));
    expect(dispute.depositReference).toBe(doc.deposit_id);
  });

  test("MapSettlementDisputeSummaryTest_NullDate (raw JSON, same payload as)", () => {
    const rawJson =
      '{"id":"DIS_812","status":"FUNDED","stage":"CHARGEBACK","stage_time_created":"","amount":"200","currency":"GBP","reason_code":"PM","reason_description":"Paid by Other Means","time_to_respond_by":"","result":"LOST","funding_type":"DEBIT","deposit_time_created":"","deposit_id":"DEP_2342423443","last_adjustment_amount":"","last_adjustment_currency":"","last_adjustment_funding":"","last_adjustment_time_created":"","system":{"mid":"11112334","tid":"22229876","hierarchy":"000-00-000-000-000","name":"MERCHANT ABC INC.","dba":"MERCHANT XYZ INC."},"transaction":{"time_created":"","merchant_time_created":"","type":"SALE","amount":"200","currency":"GBP","reference":"28012076eb6M","payment_method":{"card":{"masked_number_first6last4":"379132XXXXX1007","arn":"71400011203688701393903","brand":"AMEX","authcode":"129623","brand_reference":"MWE1P0JG80110"}}}}';
    const doc = JSON.parse(rawJson);

    const dispute = GpApiMapping.mapDisputeSummary(doc);

    const transaction = doc.transaction;
    const card = transaction?.payment_method?.card;
    expect(dispute.caseId).toBe(doc.id);
    expect(dispute.caseIdTime).toBeNull();
    expect(dispute.caseStatus).toBe(doc.status);
    expect(dispute.caseStage).toBe(doc.stage);
    expect(dispute.caseAmount).toBe(StringUtils.toAmount(doc.amount));
    expect(dispute.caseCurrency).toBe(doc.currency);
    expect(dispute.lastAdjustmentAmount).toBe(
      StringUtils.toAmount(doc.last_adjustment_amount),
    );
    expect(dispute.caseMerchantId).toBe(doc.system?.mid);
    expect(dispute.caseTerminalId).toBe(doc.system?.tid);
    expect(dispute.merchantHierarchy).toBe(doc.system?.hierarchy);
    expect(dispute.merchantName).toBe(doc.system?.name);
    expect(dispute.merchantDbaName).toBe(doc.system?.dba);
    expect(dispute.reasonCode).toBe(doc.reason_code);
    expect(dispute.reason).toBe(doc.reason_description);
    expect(dispute.result).toBe(doc.result);
    expect(dispute.transactionTime ?? null).toBeNull();
    expect(dispute.transactionType).toBe(transaction?.type);
    expect(dispute.transactionAmount).toBe(
      StringUtils.toAmount(transaction?.amount),
    );
    expect(dispute.transactionCurrency).toBe(transaction?.currency);
    expect(dispute.transactionReferenceNumber).toBe(transaction?.reference);
    expect(dispute.transactionMaskedCardNumber).toBe(
      card?.masked_number_first6last4,
    );
    expect(dispute.transactionARN).toBe(card?.arn);
    expect(dispute.transactionCardType).toBe(card?.brand);
    expect(dispute.transactionAuthCode).toBe(card?.authcode);
    expect(dispute.respondByDate ?? null).toBeNull();
    expect(dispute.depositDate).toBeNull();
    expect(dispute.depositReference).toBe(doc.deposit_id);
  });

  test.each(["accept", "challenge"])(
    "%s returns Transaction with all dispute response fields",
    async (operation) => {
      const gpApiConfig = new GpApiConfig();
      gpApiConfig.requestLogger = new SampleRequestLogger(new Logger("logs"));
      const connector = new GpApiConnector(gpApiConfig);
      jest.spyOn(connector, "signIn").mockResolvedValue(undefined);
      jest.spyOn(connector, "doTransaction").mockResolvedValue(response);
      const dispute = new DisputeSummary();
      dispute.caseId = "DIS_test";
      const builder =
        operation === "accept"
          ? dispute.accept()
          : dispute.challenge([Object.assign(new DisputeDocument(), document)]);
      const result = await connector.manageTransaction(builder);
      expect(result).toBeInstanceOf(Transaction);
      expect(result.transactionId).toBe("DIS_test");
      expect(result.responseCode).toBe("SUCCESS");
      expect(result.responseMessage).toBe("WITH_MERCHANT");
      expect(result.disputeSummary).toEqual(
        GpApiMapping.mapDisputeSummary(response),
      );
      expect(result.action).toEqual(result.disputeSummary.action);
    },
  );
});
