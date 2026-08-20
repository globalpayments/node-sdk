// tslint:disable:max-classes-per-file

export class ApiError extends Error {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, ApiError.prototype);
    this.name = this.constructor.name;
  }
}

export class ArgumentError extends ApiError {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, ArgumentError.prototype);
    this.name = this.constructor.name;
  }
}

export class BuilderError extends ApiError {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, BuilderError.prototype);
    this.name = this.constructor.name;
  }
}

export class ConfigurationError extends ApiError {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, ConfigurationError.prototype);
    this.name = this.constructor.name;
  }
}

export class GatewayError extends ApiError {
  [key: string]: any;
  public responseCode: string;
  public responseMessage: string;
  public deviceResponseCode: string;
  public deviceResponseMessage: string;
  public issuerResponseCode: string;
  public issuerResponseMessage: string;
  public rawResponse: any;
  constructor(
    m?: string,
    code?: string,
    message?: string,
    issuerResponseCode?: string,
    issuerResponseMessage?: string,
    deviceResponseCode?: string,
    deviceResponseMessage?: string,
    rawResponse?: any,
    responseData?: Record<string, any>,
  ) {
    super(m);
    Object.setPrototypeOf(this, GatewayError.prototype);
    this.name = this.constructor.name;
    if (code) {
      this.responseCode = code;
    }
    if (message) {
      this.responseMessage = message;
    }
    if (issuerResponseCode) {
      this.issuerResponseCode = issuerResponseCode;
    }
    if (issuerResponseMessage) {
      this.issuerResponseMessage = issuerResponseMessage;
    }
    if (deviceResponseCode) {
      this.deviceResponseCode = deviceResponseCode;
    }
    if (deviceResponseMessage) {
      this.deviceResponseMessage = deviceResponseMessage;
    }
    if (rawResponse !== undefined) {
      this.rawResponse = rawResponse;
    }
    if (responseData) {
      for (const key of Object.keys(responseData)) {
        if (
          key !== "__proto__" &&
          key !== "constructor" &&
          key !== "prototype"
        ) {
          this[key] = responseData[key];
        }
      }
    }
  }
}

export class NotImplementedError extends ApiError {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, NotImplementedError.prototype);
    this.name = this.constructor.name;
  }
}

export class UnsupportedTransactionError extends ApiError {
  constructor(m?: string) {
    if (!m) {
      m = "Transaction type not supported for this payment method.";
    }
    super(m);
    Object.setPrototypeOf(this, UnsupportedTransactionError.prototype);
    this.name = this.constructor.name;
  }
}
