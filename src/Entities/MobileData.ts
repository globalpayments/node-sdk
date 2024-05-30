import { SdkInterface, SdkUiType } from "./Enums";

export class MobileData {
  encodedData: string;
  applicationReference: string;
  sdkInterface: SdkInterface;
  sdkUiTypes: SdkUiType[];
  ephemeralPublicKey: string;
  maximumTimeout: number;
  referenceNumber: string;
  sdkTransReference: string;
}
