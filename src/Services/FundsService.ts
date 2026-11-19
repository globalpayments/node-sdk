import {
  ApiError,
  ConfigurationError,
  Fund,
  FundRequest,
  FundsList,
  FundsListFilters,
} from "../Entities";
import { GpApiConnector } from "../Gateways/GpApiConnector";
import { ServicesContainer } from "../ServicesContainer";

export class FundsService {
  private readonly merchantUrl: string;

  constructor(
    merchantId: string,
    private readonly configName: string = "default",
  ) {
    this.validateId(merchantId, "merchantId");
    this.merchantUrl = `/merchants/${encodeURIComponent(merchantId)}`;
  }

  public async fund(
    request: FundRequest,
    idempotencyKey?: string,
  ): Promise<Fund> {
    this.validateId(request.accountId, "accountId");
    if (!["CREDIT", "DEBIT"].includes(request.type)) {
      throw new ApiError("Fund type must be CREDIT or DEBIT.");
    }
    if (
      !["BANK_TRANSFER", "CARD"].includes(request.paymentMethod) ||
      (request.type === "CREDIT" && request.paymentMethod === "CARD")
    ) {
      throw new ApiError("Use BANK_TRANSFER, or CARD for a DEBIT.");
    }
    if (
      typeof request.amount !== "string" ||
      !/^[0-9]{1,50}$/.test(request.amount) ||
      !/[1-9]/.test(request.amount)
    ) {
      throw new ApiError(
        "Amount must be a positive minor-unit integer string.",
      );
    }
    if (!/^[A-Z]{3}$/.test(request.currency)) {
      throw new ApiError("Currency must be a three-letter uppercase code.");
    }
    if (
      idempotencyKey !== undefined &&
      (!idempotencyKey || idempotencyKey.length > 50)
    ) {
      throw new ApiError("Idempotency key must contain 1 to 50 characters.");
    }
    const response = await this.client().doTransaction(
      "POST",
      `${this.merchantUrl}/settlement/funds`,
      JSON.stringify({
        account_name: request.accountName,
        account_id: request.accountId,
        type: request.type,
        amount: request.amount,
        currency: request.currency,
        payment_method: request.paymentMethod,
      }),
      undefined,
      idempotencyKey,
    );
    return new Fund(response);
  }

  public async getFund(fundId: string): Promise<Fund> {
    this.validateId(fundId, "fundId");
    return new Fund(
      await this.client().doTransaction(
        "GET",
        `${this.merchantUrl}/funds/${encodeURIComponent(fundId)}`,
      ),
    );
  }

  public async listFunds(
    accountId: string,
    filters: FundsListFilters = {},
  ): Promise<FundsList> {
    this.validateId(accountId, "accountId");
    const query: { [key: string]: string } = {};
    for (const [key, value] of [
      ["from_time_created", filters.fromTimeCreated],
      ["to_time_created", filters.toTimeCreated],
    ]) {
      if (value !== undefined) {
        if (
          !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
          !Number.isFinite(Date.parse(value)) ||
          new Date(value).toISOString().slice(0, 10) !== value
        ) {
          throw new ApiError(
            "Funds date filters must be valid YYYY-MM-DD dates.",
          );
        }
        query[key!] = value;
      }
    }
    if (
      filters.fromTimeCreated &&
      filters.toTimeCreated &&
      filters.fromTimeCreated > filters.toTimeCreated
    ) {
      throw new ApiError("Funds start date must not follow the end date.");
    }
    return new FundsList(
      await this.client().doTransaction(
        "GET",
        `${this.merchantUrl}/accounts/${encodeURIComponent(accountId)}/funds`,
        undefined,
        query,
      ),
    );
  }

  private client(): GpApiConnector {
    const client = ServicesContainer.instance().getClient(this.configName);
    if (!(client instanceof GpApiConnector)) {
      throw new ConfigurationError("Funds requires a GP API configuration.");
    }
    return client;
  }

  private validateId(value: string, name: string) {
    if (typeof value !== "string" || !value.trim() || value.length > 50) {
      throw new ApiError(`${name} must contain 1 to 50 characters.`);
    }
  }
}
