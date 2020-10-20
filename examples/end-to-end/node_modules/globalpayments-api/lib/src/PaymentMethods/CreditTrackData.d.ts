import { EntryMethod } from "../";
import { Credit } from "./Credit";
import { ITrackData } from "./Interfaces";
export declare class CreditTrackData extends Credit implements ITrackData {
    entryMethod: EntryMethod;
    value: string;
}
