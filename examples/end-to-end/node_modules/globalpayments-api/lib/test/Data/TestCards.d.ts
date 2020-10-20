import { CreditCardData, CreditTrackData, DebitTrackData, EBTCardData, EBTTrackData, EntryMethod, GiftCard } from "../../src";
export declare class TestCards {
    static asDebit(card: CreditTrackData, pinBlock: string): DebitTrackData;
    static asEBTTrack(card: CreditTrackData, pinBlock: string): EBTTrackData;
    static asEBTManual(card: CreditCardData, pinBlock: string): EBTCardData;
    static visaManual(cardPresent?: boolean, readerPresent?: boolean): CreditCardData;
    static visaSwipe(entryMethod?: EntryMethod): CreditTrackData;
    static visaSwipeEncrypted(entryMethod?: EntryMethod): CreditTrackData;
    static masterCardManual(cardPresent?: boolean, readerPresent?: boolean): CreditCardData;
    static masterCardSwipe(entryMethod?: EntryMethod): CreditTrackData;
    static masterCard24Swipe(entryMethod?: EntryMethod): CreditTrackData;
    static masterCard25Swipe(entryMethod?: EntryMethod): CreditTrackData;
    static masterCardSwipeEncrypted(entryMethod?: EntryMethod): CreditTrackData;
    static discoverManual(cardPresent?: boolean, readerPresent?: boolean): CreditCardData;
    static discoverSwipe(entryMethod?: EntryMethod): CreditTrackData;
    static discoverSwipeEncrypted(entryMethod?: EntryMethod): CreditTrackData;
    static amexManual(cardPresent?: boolean, readerPresent?: boolean): CreditCardData;
    static amexSwipe(entryMethod?: EntryMethod): CreditTrackData;
    static jcbManual(cardPresent?: boolean, readerPresent?: boolean): CreditCardData;
    static jcbSwipe(entryMethod?: EntryMethod): CreditTrackData;
    static giftCard1Swipe(): GiftCard;
    static giftCard2Manual(): GiftCard;
    static gsbManual(): CreditCardData;
}
