export interface IInputTypeLengths {
    city: number;
    email: number;
    firstName: number;
    lastName: number;
    phoneNumber: number;
    postalCode: number;
    province: number;
}
export declare type GatewayType = "portico" | "realex";
export declare function validateAmount(_gateway: GatewayType, amount: string | number, _impliedDecimal?: boolean): string;
export declare function validateInput(gateway: GatewayType, inputType: keyof IInputTypeLengths, input: string | undefined): string;
