import { 
    ConfigurationError,
    Environment, 
    GatewayProvider, 
    ServiceEndpoints, 
    ShaHashType,
} from "../../../src/Entities";
import { GatewayConfig } from "./GatewayConfig";
import { GpEcomConnector } from "../../../src/Gateways/";
import { HostedPaymentConfig } from "../../../src";
import { ConfiguredServices } from "../../../src/ConfiguredServices";

export class GpEcomConfig extends GatewayConfig {

    public accountId: string;
    public merchantId: string;
    public rebatePassword: string;
    public refundPassword: string;
    public sharedSecret: string;
    public channel: string;
    public hostedPaymentConfig: HostedPaymentConfig;
    public shaHashType = ShaHashType.SHA1;

    // Secure 3D
    public challengeNotificationUrl: string;
    public methodNotificationUrl: string;
    public merchantContactUrl: string;
    public merchantNotificationUrl: string;

    constructor () {
        super(GatewayProvider.GpEcom);
    }

    public configureContainer(services: ConfiguredServices) {
        // parent::configureContainer(services); // must implement data services first
        
        if (!this.serviceUrl) {
            this.serviceUrl = this.environment == Environment.Test ? ServiceEndpoints.GLOBAL_ECOM_TEST : ServiceEndpoints.GLOBAL_ECOM_PRODUCTION;
        }

        const gateway = new GpEcomConnector(this);
        gateway.timeout = this.timeout;
        gateway.hostedPaymentConfig = this.hostedPaymentConfig;

        gateway.serviceUrl = this.serviceUrl;
 

        services.gatewayConnector = gateway;
        services.recurringConnector = gateway;

    }

    public validate() {
        super.validate();
        
        if (!this.merchantId) {
            throw new ConfigurationError("MerchantId is required for this gateway.");
        }

        if (!this.sharedSecret) {
            throw new ConfigurationError("SharedSecret is required for this gateway.");
        }
    }
}
