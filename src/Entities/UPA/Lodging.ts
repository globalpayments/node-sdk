import { ExtraChargeType } from "./ExtraChargeType";

export class Lodging {
  public folioNumber?: string;
  public stayDuration?: number;
  public checkInDate?: Date;
  public checkOutDate?: Date;
  public dailyRate?: number;
  public preferredCustomer?: boolean;
  public extraChargeTypes: ExtraChargeType[] = [];
  public extraChargeTotal?: number;
}
