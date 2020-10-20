export declare class ApiError extends Error {
    constructor(m?: string);
}
export declare class ArgumentError extends ApiError {
    constructor(m?: string);
}
export declare class BuilderError extends ApiError {
    constructor(m?: string);
}
export declare class ConfigurationError extends ApiError {
    constructor(m?: string);
}
export declare class GatewayError extends ApiError {
    responseCode: string;
    responseMessage: string;
    constructor(m?: string, code?: string, message?: string);
}
export declare class NotImplementedError extends ApiError {
    constructor(m?: string);
}
export declare class UnsupportedTransactionError extends ApiError {
    constructor(m?: string);
}
