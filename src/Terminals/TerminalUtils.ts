import { DeviceMessage } from "./DeviceMessage";
import { ControlCodes } from "./Enums/ControlCodes";

export class TerminalUtils {
  public static buildUpaRequest(
    requestParams: Record<string, any>,
  ): DeviceMessage {
    const buffer: number[] = [];

    // Begin Message
    buffer.push(ControlCodes.STX);
    buffer.push(ControlCodes.LF);

    // Add the Message
    buffer.push(...Array.from(Buffer.from(JSON.stringify(requestParams))));

    // End the Message
    buffer.push(ControlCodes.LF);
    buffer.push(ControlCodes.ETX);
    buffer.push(ControlCodes.LF);

    const deviceMessage = new DeviceMessage(Buffer.from(buffer));
    deviceMessage.setJsonRequest(requestParams as any[]);
    return deviceMessage;
  }
}
