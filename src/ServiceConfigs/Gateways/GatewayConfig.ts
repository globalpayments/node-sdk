import { GatewayProvider } from "../../../src/Entities";
import { AcceptorConfig } from "../AcceptorConfig";
import { Configuration } from "../Configuration";

export abstract class GatewayConfig extends Configuration {
    public acceptorConfig: AcceptorConfig;

    protected _gatewayProvider: GatewayProvider;

    public dataClientId: string;

    public dataClientSecret: string;

    public dataClientUserId: string;

    public dataClientSeviceUrl: string;

    constructor(provider: GatewayProvider) {
        super();
        this._gatewayProvider = provider;
    }

    // public configureContainer(services)
    // {
    //     // need to implement dataServicesConnector
    // }

    public validate() {
        super.validate();

        return;
        // data client validations go here when enabled
    }

    get gatewayProvider() {
        return this._gatewayProvider;
    }
}
