import { Transaction } from "../Entities/Transaction";
import { PayFacBuilder } from "../Builders/PayFacBuilder";

export interface IPayFacProvider{
   processPayFac(builder: PayFacBuilder) : Promise<Transaction>;
}