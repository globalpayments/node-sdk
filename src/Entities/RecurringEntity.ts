/* eslint-disable indent */
import {
  RecurringService,
  ServicesContainer,
  UnsupportedTransactionError,
} from "../";

export interface IRecurringEntity {
  id: string;
  key: string;
}

export class RecurringEntity<TResult extends IRecurringEntity>
  implements IRecurringEntity
{
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
  public static find<TResult extends IRecurringEntity>(
    id: string,
    configName: string = "default",
  ): Promise<TResult | undefined> {
    const client = ServicesContainer.instance().getRecurringClient(configName);
    if (!client.supportsRetrieval) {
      throw new UnsupportedTransactionError();
    }

    const identifier = RecurringEntity.getIdentifierName(this);
    return RecurringService.search<TResult>(this)
      .addSearchCriteria(identifier, id)
      .execute(configName)
      .then((response: any[] | TResult) => {
        if (!response || (response as any).length === 0) {
          return;
        }
        const entity = (response as any)[0] || response;
        if (entity) {
          return RecurringService.get<TResult>(entity, configName);
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
  public static findAll<TResult extends IRecurringEntity>(
    configName: string = "default",
  ) {
    const client = ServicesContainer.instance().getRecurringClient();
    if (client.supportsRetrieval) {
      return RecurringService.search<TResult>(this).execute(configName);
    }
    throw new UnsupportedTransactionError();
  }

  private static getIdentifierName(fn: any) {
    if (fn.name === "Customer") {
      return "customerIdentifier";
    } else if (fn.name === "RecurringPaymentMethod") {
      return "paymentMethodIdentifier";
    }

    return "scheduleIdentifier";
  }

  /// <summary>
  /// Creates a resource
  /// </summary>
  /// <returns>TResult</returns>
  public create(configName: string = "default") {
    return RecurringService.create(this as any as TResult, configName);
  }

  /// <summary>
  /// Delete a record from the gateway.
  /// </summary>
  /// <param name="force">Indicates if the deletion should be forced</summary>
  /// <exception cref="ApiException">Thrown when the record cannot be deleted.</exception>
  public delete(configName: string = "default") {
    return RecurringService.delete(this as unknown as TResult, configName);
  }

  /// <summary>
  /// The current record should be updated.
  /// </summary>
  /// <remarks>
  /// Any modified properties will be persisted with the gateway.
  /// </remarks>
  /// <exception cref="ApiException">Thrown when the record cannot be updated.</exception>
  public saveChanges(configName: string = "default") {
    return RecurringService.edit(this as any as TResult, configName);
  }
}
