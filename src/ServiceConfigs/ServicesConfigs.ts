import { GatewayConfig } from "./Gateways/GatewayConfig";

export class ServicesConfigs {
    public gatewayConfig: GatewayConfig;

    public timeout: number;

    public validate() {
        if (this.gatewayConfig !== undefined) {
            this.gatewayConfig.validate();
        }
    }
}
