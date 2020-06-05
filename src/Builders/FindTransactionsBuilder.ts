import { ReportType } from "../";
import { ReportBuilder } from "./ReportBuilder";

export class FindTransactionsBuilder<T> extends ReportBuilder<T> {
  public clientTransactionId: string;

  public setupValidations() {
    this.validations.of("reportType", ReportType.FindTransactions)
        .check("clientTransactionId")
        .isNotNull();
  }

  public withClientTransactionId(clientTransactionId: string) {
      if (clientTransactionId !==  undefined) {
          this.clientTransactionId = clientTransactionId;
      }
      return this;
  }
}
