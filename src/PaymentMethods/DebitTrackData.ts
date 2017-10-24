import { EntryMethod } from "../";
import { Debit } from "./Debit";
import { ITrackData } from "./Interfaces";

export class DebitTrackData extends Debit implements ITrackData {
  public entryMethod: EntryMethod;
  public value: string;
}
