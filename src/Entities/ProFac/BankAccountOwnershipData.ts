import { Address } from "../../Entities";
export class BankAccountOwnershipData {
    public firstName: string;
    public lastName: string;
    public ownerAddress: Address;
    public phoneNumber: string;

    constructor() {
        this.ownerAddress = new Address();
    }
}
