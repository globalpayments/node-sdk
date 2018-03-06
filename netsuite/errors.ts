// tslint:disable:max-classes-per-file

export class ApiError {
  public message: string;
  public name: string;
  constructor(m?: string, name = "ApiError") {
    if (m) {
      this.message = m;
    } else {
      this.message = "Unexpected error";
    }
    this.name = name;
  }
}

export class ArgumentError extends ApiError {
  constructor(m?: string) {
    super(m, "ArgumentError");
  }
}

export class BuilderError extends ApiError {
  constructor(m?: string) {
    super(m, "BuilderError");
  }
}

export class ConfigurationError extends ApiError {
  constructor(m?: string) {
    super(m, "ConfigurationError");
  }
}

export class GatewayError extends ApiError {
  public responseCode: string;
  public responseMessage: string;
  constructor(m?: string, code?: string, message?: string) {
    super(m, "GatewayError");
    if (code) {
      this.responseCode = code;
    }
    if (message) {
      this.responseMessage = message;
    }
  }
}

export class NotImplementedError extends ApiError {
  constructor(m?: string) {
    super(m, "NotImplementedError");
  }
}

export class UnsupportedTransactionError extends ApiError {
  constructor(m?: string) {
    if (!m) {
      m = "Transaction type not supported for this payment method.";
    }
    super(m, "UnsupportedTransactionError");
  }
}
