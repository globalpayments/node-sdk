import { EntryMethod } from "../";
import { Credit } from "./Credit";
import { ITrackData } from "./Interfaces";

export class CreditTrackData extends Credit implements ITrackData {
    public entryMethod: EntryMethod;
    public value: string;
}
