import { EntryMethod } from "../";
import { Debit } from "./Debit";
import { ITrackData } from "./Interfaces";
export declare class DebitTrackData extends Debit implements ITrackData {
    entryMethod: EntryMethod;
    value: string;
}
