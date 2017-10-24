import {
  EncryptionData,
  EntryMethod,
} from "../";
import { EBT } from "./EBT";
import {
  IEncryptable,
  ITrackData,
} from "./Interfaces";

export class EBTTrackData extends EBT implements ITrackData, IEncryptable {
  public encryptionData: EncryptionData;
  public entryMethod: EntryMethod;
  public value: string;
}
