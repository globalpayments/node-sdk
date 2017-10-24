import {
  RecurringService,
  ServicesContainer,
  UnsupportedTransactionError,
} from "../";

export interface IRecurringEntity {
  id: string;
  key: string;
}

export class RecurringEntity<TResult extends IRecurringEntity> implements IRecurringEntity {
  /// <summary>
  /// All resource should be supplied a merchant-/application-defined ID.
  /// </summary>
  public id: string;

  /// <summary>
  /// All resources should be supplied a gateway-defined ID.
  /// </summary>
  public key: string;

  /// <summary>
  /// Searches for a specific record by `id`.
  /// </summary>
  /// <param name="id">The ID of the record to find</summary>
  /// <returns>`TResult` or `null` if the record cannot be found.</returns>
  /// <exception cref="UnsupportedTransactionError">
  /// Thrown when gateway does not support retrieving recurring records.
  /// </exception>
  public static find<TResult extends IRecurringEntity>(id: string): Promise<TResult | undefined> {
    const client = ServicesContainer.instance().getRecurringClient();
    if (!client.supportsRetrieval) {
      throw new UnsupportedTransactionError();
    }

    const identifier = RecurringEntity.getIdentifierName();
    return RecurringService.search<TResult>()
      .addSearchCriteria(identifier, id)
      .execute()
      .then((response: any[]) => {
        if (!response) {
          return;
        }
        const entity = response[1];
        if (entity) {
          return RecurringService.get<TResult>(entity.key);
        }
        return;
      });
  }

  /// <summary>
  /// Lists all records of type `TResult`.
  /// </summary>
  /// <exception cref="UnsupportedTransactionError">
  /// Thrown when gateway does not support retrieving recurring records.
  /// </exception>
  public static findAll<TResult extends IRecurringEntity>() {
    const client = ServicesContainer.instance().getRecurringClient();
    if (client.supportsRetrieval) {
      return RecurringService.search<TResult>().execute();
    }
    throw new UnsupportedTransactionError();
  }

  private static getIdentifierName() {
      // if ((typeof(TResult)).Equals(typeof(Customer)))
      //     return "customerIdentifier";
      // else if ((typeof(TResult)).Equals(typeof(RecurringPaymentMethod)))
      //     return "paymentMethodIdentifier";
      // else if ((typeof(TResult)).Equals(typeof(Schedule)))
      //     return "scheduleIdentifier";
      return "";
  }

  /// <summary>
  /// Creates a resource
  /// </summary>
  /// <returns>TResult</returns>
  public create() {
      return RecurringService.create((this as any) as TResult);
  }

  /// <summary>
  /// Delete a record from the gateway.
  /// </summary>
  /// <param name="force">Indicates if the deletion should be forced</summary>
  /// <exception cref="ApiException">Thrown when the record cannot be deleted.</exception>
  public delete(force = false) {
    return RecurringService.delete((this as any) as TResult, force);
  }

  /// <summary>
  /// The current record should be updated.
  /// </summary>
  /// <remarks>
  /// Any modified properties will be persisted with the gateway.
  /// </remarks>
  /// <exception cref="ApiException">Thrown when the record cannot be updated.</exception>
  public saveChanges() {
    return RecurringService.edit((this as any) as TResult);
  }
}
