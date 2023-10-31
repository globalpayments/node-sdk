import {
  CardDataInputCapability,
  CardDataOutputCapability,
  CardHolderAuthenticationCapability,
  CardHolderAuthenticationEntity,
} from "../../src/Entities";

export class AcceptorConfig {
  /**
   * Used w/TransIT
   */
  public cardCaptureCapability: boolean;

  /**
   * Used w/TransIT
   */
  public cardDataInputCapability: CardDataInputCapability;

  /**
   * Used w/TransIT
   */
  public cardDataOutputCapability: CardDataOutputCapability;

  /**
   * Used w/TransIT; corresponding tag will default to eComm or Manual if this isn't used
   */
  public cardDataSource: unknown;

  /**
   * Used w/TransIT
   */
  public cardHolderAuthenticationCapability: CardHolderAuthenticationCapability;

  /**
   * Used w/TransIT
   */
  public cardHolderAuthenticationEntity: CardHolderAuthenticationEntity;

  constructor(
    cardCaptureCapability = false,
    cardDataInputCapability = CardDataInputCapability.KeyedEntryOnly,
    cardDataOutputCapability = CardDataOutputCapability.None,
    cardHolderAuthenticationCapability = CardHolderAuthenticationCapability.NoCapability,
    cardHolderAuthenticationEntity = CardHolderAuthenticationEntity.NotAuthenticated,
  ) {
    this.cardCaptureCapability = cardCaptureCapability;
    this.cardDataInputCapability = cardDataInputCapability;
    this.cardDataOutputCapability = cardDataOutputCapability;
    this.cardHolderAuthenticationCapability =
      cardHolderAuthenticationCapability;
    this.cardHolderAuthenticationEntity = cardHolderAuthenticationEntity;
  }

  public validate() {
    // for use in future gateway integrations
  }
}
