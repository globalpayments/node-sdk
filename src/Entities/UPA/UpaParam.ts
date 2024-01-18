import { AcquisitionType } from "../Enums/AcquisitionType";

export class UpaParam {
  public timeout: number;
  public acquisitionTypes: AcquisitionType;
  public header: string;
  public displayTotalAmount: string;
  public promptForManual: boolean;
  public brandIcon1: number;
  public brandIcon2: number;
}
