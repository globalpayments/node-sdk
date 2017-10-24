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
  public responseCode: string;
  public responseMessage: string;
  constructor(m?: string, code?: string, message?: string) {
    super(m);
    Object.setPrototypeOf(this, GatewayError.prototype);
    this.name = this.constructor.name;
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
