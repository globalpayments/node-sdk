export class EncryptionData {
  public version: string;
  public trackNumber: string;
  public ktb: string;
  public ksn: string;

  public static version1(): EncryptionData {
    const data = new EncryptionData();
    data.version = "01";
    return data;
  }
}
