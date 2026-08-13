/**
 * Parameters for the UPA Scan command.
 *
 * See UPA API §12.3.17 Scan for field descriptions:
 *   - header    (AN 1-20)  Text displayed below the QR code preview pane.
 *   - prompt1   (AN 1-50)  Text displayed below the header.
 *   - prompt2   (AN 1-50)  Text displayed below prompt1.
 *   - displayOption (N1)   0 = No Screen Change, 1 = Return to Idle Screen.
 *   - timeOut   (N 1-3)    Timeout in seconds (0 = infinite, 1-999 seconds).
 */
export class ScanData {
  public header?: string;
  public prompt1?: string;
  public prompt2?: string;
  public displayOption?: number;
  public timeOut?: number;
}
