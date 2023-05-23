
export class ThreatRiskData {
    /// <summary>
    /// SourceIp of Merchant, see ProPay Fraud Detection Solutions Manual
    /// </summary>
    public merchantSourceIP: string;
    /// <summary>
    /// Threat Metrix Policy, see ProPay Fraud Detection Solutions Manual
    /// </summary>
    public threatMetrixPolicy: string;
    /// <summary>
    /// SessionId for Threat Metrix, see ProPay Fraud Detection Solutions Manual
    /// </summary>
    public threatMetrixSessionID: string;
}