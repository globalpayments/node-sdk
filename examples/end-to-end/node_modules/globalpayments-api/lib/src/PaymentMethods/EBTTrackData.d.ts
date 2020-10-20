import { EncryptionData, EntryMethod } from "../";
import { EBT } from "./EBT";
import { IEncryptable, ITrackData } from "./Interfaces";
export declare class EBTTrackData extends EBT implements ITrackData, IEncryptable {
    encryptionData: EncryptionData;
    entryMethod: EntryMethod;
    value: string;
}
