export interface IInputTypeLengths {
  city: number;
  email: number;
  firstName: number;
  lastName: number;
  phoneNumber: number;
  postalCode: number;
  province: number;
};

export type GatewayType = "portico" | "realex";

type IGatewayInputMaxLengths = {
  [key in GatewayType]: IInputTypeLengths;
};

type IInputLabels = {
  [key in keyof IInputTypeLengths]: string;
};

const inputFieldMaxLength: IGatewayInputMaxLengths = {
  portico: {
    city: 20,
    email: 100,
    firstName: 26,
    lastName: 26,
    phoneNumber: 20,
    postalCode: 9,
    province: 20,
  },
  // todo: Use actual values
  realex: {
    city: 0,
    email: 0,
    firstName: 0,
    lastName: 0,
    phoneNumber: 0,
    postalCode: 0,
    province: 0,
  },
};

const inputLabels: IInputLabels = {
  city: "City",
  email: "Email address",
  firstName: "First name",
  lastName: "Last name",
  phoneNumber: "Phone number",
  postalCode: "Zip/postal code",
  province: "State/province",
};

const inputLengthErrorMessage = (label: string) => `${label} length greater than the configured gateway's maximum length`;

export function validateAmount(_gateway: GatewayType, amount: string | number, _impliedDecimal = false): string {
  if (!amount || amount < 0) {
    throw new Error("Amount must be greater than or equal to 0");
  }

  return parseFloat((Math.round((amount as number) * 100) / 100).toString()).toFixed(2);
}

export function validateInput(gateway: GatewayType, inputType: keyof IInputTypeLengths, input: string | undefined): string {
  if (!input) {
    return "";
  }

  input = input.trim();

  let label = inputLabels[inputType];
  switch (inputType) {
    case "email":
      if (!/^[^\s@]+@[^\s@]+$/.test(input)) {
        throw new Error(`${label} is in wrong format`);
      }
      break;
    case "phoneNumber":
      input = input.replace(/\D+/g, "");
      break;
    case "postalCode":
      input = input.replace(/[^0-9A-Za-z]/g, "");
      break;
    default:
  }

  if (!label) {
    label = "Input";
  }

  if (input.length > inputFieldMaxLength[gateway][inputType]) {
    throw new Error(inputLengthErrorMessage(label));
  }

  return input;
}
