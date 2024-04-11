import {
  StoredCredentialInitiator,
  StoredCredentialReason,
  StoredCredentialSequence,
  StoredCredentialType,
} from ".";

export class StoredCredential {
  public type: StoredCredentialType;
  public initiator: StoredCredentialInitiator;
  public sequence: StoredCredentialSequence;
  public schemeId: string;
  public reason: StoredCredentialReason;
  public cardBrandTransactionId: string;
}
