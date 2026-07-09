/**
 * PorticoTokenConfig holds configuration for Portico token authentication
 * when requesting a GP API access token using Portico credentials.
 *
 * com.global.api.entities.gpApi.entities.PorticoTokenConfig.
 */
export class PorticoTokenConfig {
  /** Site ID. */
  public siteId: string;

  /** Account's license ID. */
  public licenseId: string;

  /** Account's device ID. */
  public deviceId: string;

  /** Account's username. */
  public username: string;

  /** Account's password. */
  public password: string;

  /**
   * Secret API key used for authenticating requests.
   *
   * Handle with care; store securely and only expose to authorized
   * components.
   */
  public secretApiKey: string;
}
