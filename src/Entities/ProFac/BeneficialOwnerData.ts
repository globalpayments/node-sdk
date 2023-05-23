import { OwnersData } from "./OwnersData";

export class BeneficialOwnerData {
    public ownersCount: string;
    public ownersList: Array<OwnersData>;

    public constructor() {
        this.ownersList = new Array<OwnersData>();
    }
}
