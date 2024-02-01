import { ConfiguredServices } from "src/ConfiguredServices";
import { Environment, IRequestLogger } from "../../src/Entities/";

export abstract class Configuration {
  public timeout: number = 65000;

  public environment: Environment = Environment.Test;

  public requestLogger: IRequestLogger;

  public serviceUrl: string;

  public validated: boolean;

  public webProxy: unknown;

  public enableLogging: boolean;

  public forceGatewayTimeout: boolean;

  public dynamicHeaders: Record<string, string>;

  public abstract configureContainer(services: ConfiguredServices): void;

  public validate() {
    this.validated = true;
  }
}
