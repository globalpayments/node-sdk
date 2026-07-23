import { TransactionResponse } from "./TransactionResponse";

/**
 * Response from StartCardTransaction.
 */
export class UpaGiftCardResponse extends TransactionResponse {
  public acquisitionType = "";
  public luhnCheckPassed = "";
  public dataEncryptionType = "";
  public serviceCode = "";
  public fallback = "";
  public clearPan = "";
  public maskedPan = "";
  public encryptedPan = "";
  public clearTrack1 = "";
  public maskedTrack1 = "";
  public clearTrack2 = "";
  public maskedTrack2 = "";
  public clearTrack3 = "";
  public maskedTrack3 = "";
  public emvTags = "";
  public expiryDate = "";
  public cvv = "";
  public address = "";
  public zipCode = "";
  public scannedData = "";
  public pinBlock = "";
  public pinKsn = "";
  public encryptedBlob = "";
  public encryptedBlobKsn = "";
  public cardType = "";
  public cardBrand = "";
  public cardBrandShortName = "";
  public cardSecurityPromptFlag = "";
  public avsFlag = "";
  public cashBackFlag = "";
  public surchargeFlag = "";
  public ebtCardType = "";
  public dccEligible = "";

  constructor(jsonResponse: any) {
    super(jsonResponse);

    const responseData = this.extractResponseData(jsonResponse);
    const pan = responseData?.PAN ?? responseData?.Pan;
    const trackData = responseData?.trackData;
    const pinDukpt = responseData?.PinDUKPT;
    const tripleDesDukpt = responseData?.["3DesDukpt"];
    const cardBinDetails = responseData?.CardBinDetails;

    this.acquisitionType = responseData?.acquisitionType ?? "";
    this.luhnCheckPassed = responseData?.LuhnCheckPassed ?? "";
    this.dataEncryptionType = responseData?.dataEncryptionType ?? "";
    this.serviceCode = responseData?.serviceCode ?? "";
    this.fallback = responseData?.fallback ?? "";
    this.clearPan = pan?.clearPAN ?? "";
    this.maskedPan = pan?.maskedPAN ?? "";
    this.encryptedPan = pan?.encryptedPAN ?? "";
    this.clearTrack1 = trackData?.clearTrack1 ?? "";
    this.maskedTrack1 = trackData?.maskedTrack1 ?? "";
    this.clearTrack2 = trackData?.clearTrack2 ?? "";
    this.maskedTrack2 = trackData?.maskedTrack2 ?? "";
    this.clearTrack3 = trackData?.clearTrack3 ?? "";
    this.maskedTrack3 = trackData?.maskedTrack3 ?? "";
    this.emvTags = responseData?.EmvTags ?? "";
    this.expiryDate = responseData?.expiryDate ?? "";
    this.expirationDate = this.expiryDate || this.expirationDate;
    this.cvv = responseData?.Cvv ?? "";
    this.address = responseData?.address ?? "";
    this.zipCode = responseData?.zipCode ?? "";
    this.scannedData = responseData?.ScannedData ?? "";
    this.pinBlock = pinDukpt?.PinBlock ?? "";
    this.pinKsn = pinDukpt?.Ksn ?? "";
    this.encryptedBlob = tripleDesDukpt?.encryptedBlob ?? "";
    this.encryptedBlobKsn = tripleDesDukpt?.Ksn ?? "";
    this.cardType = cardBinDetails?.cardType ?? "";
    this.cardBrand = cardBinDetails?.cardBrand ?? "";
    this.cardBrandShortName = cardBinDetails?.cardBrandShortName ?? "";
    this.cardSecurityPromptFlag = cardBinDetails?.cardSecurityPromptFlag ?? "";
    this.avsFlag = cardBinDetails?.AVSFlag ?? "";
    this.cashBackFlag = cardBinDetails?.cashBackFlag ?? "";
    this.surchargeFlag = cardBinDetails?.surchargeFlag ?? "";
    this.ebtCardType = cardBinDetails?.EBTCardType ?? "";
    this.dccEligible = cardBinDetails?.DCCEligible ?? "";
  }

  private extractResponseData(jsonResponse: any): any {
    if (jsonResponse?.provider && jsonResponse?.response?.data) {
      return jsonResponse.response.data;
    }

    return jsonResponse?.data?.data ?? {};
  }
}
