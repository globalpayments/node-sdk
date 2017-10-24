import {
  AliasAction,
  ApiError,
  AuthorizationBuilder,
  InquiryType,
  PaymentMethodType,
  TransactionType,
} from "../";
import {
  IBalanceable,
  IChargable,
  IPrePayable,
  IReversable,
} from "./Interfaces";
import { PaymentMethod } from "./PaymentMethod";

export class GiftCard extends PaymentMethod implements
  IPrePayable,
  IBalanceable,
  IReversable,
  IChargable {
  /**
   * Payment method value types
   *
   * @var string[]
   */
  protected static valueTypes = [
    "alias",
    "number",
    "token",
    "trackData",
  ];

  /**
   * Payment method type
   *
   * @var PaymentMethodType
   */
  public paymentMethodType = PaymentMethodType.Gift;

  /**
   * Payment method PIN
   *
   * @var string
   */
  public pin: string;

  /**
   * Payment method value
   *
   * @internal
   * @var string
   */
  public value: string;

  /**
   * Payment method value type
   *
   * @internal
   * @var string
   */
  public valueType: string;

  /**
   * Creates a new payment method
   *
   * @param string alias Alias to use
   *
   * @return GiftCard
   */
  public static create(alias?: string) {
    const card = new GiftCard();

    return (new AuthorizationBuilder(TransactionType.Alias, card))
      .withAlias(AliasAction.Create, alias)
      .execute()
      .then((response) => {
        if (response.responseCode === "00") {
          return response.giftCard;
        }

        throw new ApiError(response.responseMessage);
      })
      .catch(() => {
        throw new ApiError("Unable to create gift card alias");
      });
  }

  /**
   * Adds an alias to the payment method
   *
   * @param string alias Alias to add
   *
   * @return AuthorizationBuilder
   */
  public addAlias(alias?: string) {
    return (new AuthorizationBuilder(TransactionType.Alias, this))
      .withAlias(AliasAction.Add, alias);
  }

  /**
   * Activates the payment method with the given amount
   *
   * @param string|number amount Amount to add
   *
   * @return AuthorizationBuilder
   */
  public activate(amount?: string | number) {
    return (new AuthorizationBuilder(TransactionType.Activate, this))
      .withAmount(amount);
  }

  /**
   * Adds value to the payment method
   *
   * @param string|number amount Amount to add
   *
   * @return AuthorizationBuilder
   */
  public addValue(amount?: string | number) {
    return (new AuthorizationBuilder(TransactionType.AddValue, this))
      .withAmount(amount);
  }

  /**
   * Inquires the balance of the payment method
   *
   * @param InquiryType inquiry Type of inquiry
   *
   * @return AuthorizationBuilder
   */
  public balanceInquiry(inquiry?: InquiryType) {
    return (new AuthorizationBuilder(TransactionType.Balance, this))
      .withBalanceInquiryType(inquiry);
  }

  /**
   * Authorizes the payment method and captures the entire authorized amount
   *
   * @param string|number amount Amount to authorize
   *
   * @return AuthorizationBuilder
   */
  public charge(amount?: string | number) {
    return (new AuthorizationBuilder(TransactionType.Sale, this))
      .withAmount(amount);
  }

  /**
   * Deactivates the payment method
   *
   * @return AuthorizationBuilder
   */
  public deactivate() {
    return new AuthorizationBuilder(TransactionType.Deactivate, this);
  }

  /**
   * Removes an alias to the payment method
   *
   * @param string alias Alias to remove
   *
   * @return AuthorizationBuilder
   */
  public removeAlias(alias?: string) {
    return (new AuthorizationBuilder(TransactionType.Alias, this))
      .withAlias(AliasAction.Delete, alias);
  }

  /**
   * Replaces the payment method with the given one
   *
   * @param GiftCard newCard Replacement gift card
   *
   * @return AuthorizationBuilder
   */
  public replaceWith(newCard?: GiftCard) {
    return (new AuthorizationBuilder(TransactionType.Replace, this))
      .withReplacementCard(newCard);
  }

  /**
   * Reverses the payment method
   *
   * @param string|number amount Amount to reverse
   *
   * @return AuthorizationBuilder
   */
  public reverse(amount?: string | number) {
    return (new AuthorizationBuilder(TransactionType.Reversal, this))
      .withAmount(amount);
  }

  /**
   * Rewards the payment method
   *
   * @param string|number amount Amount to reward
   *
   * @return AuthorizationBuilder
   */
  public rewards(amount?: string | number) {
    return (new AuthorizationBuilder(TransactionType.Reward, this))
      .withAmount(amount);
  }

  get alias(): string {
    return this.value;
  }

  set alias(value: string) {
    this.value = value;
    this.valueType = "Alias";
  }

  get number(): string {
    return this.value;
  }

  set number(value: string) {
    this.value = value;
    this.valueType = "CardNbr";
  }

  get token(): string {
    return this.value;
  }

  set token(value: string) {
    this.value = value;
    this.valueType = "TokenValue";
  }

  get trackData(): string {
    return this.value;
  }

  set trackData(value: string) {
    this.value = value;
    this.valueType = "TrackData";
  }
}
