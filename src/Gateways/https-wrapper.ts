import * as https from "https";
import { Socket } from "net";

import { ApiError, GatewayError } from "../Entities/Errors";

export const request = (
  data?: string,
  options?: https.RequestOptions,
): Promise<string> =>
  new Promise((resolve, reject) => {
    if (options === undefined) {
      options = {};
    }

    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (d: string) => (responseData += d));
      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(
            new GatewayError(`Unexpected HTTP status code [${res.statusCode}]`),
          );
        }
        resolve(responseData);
      });
      res.on("error", reject);
    });
    req.on("socket", (socket: Socket) => {
      socket.setTimeout(this.timeout || 100000);
      socket.on("timeout", () => {
        req.abort();
        reject(new ApiError("Socket timeout occurred."));
      });
    });
    req.on("error", reject);
    if (data !== undefined) {
      req.write(data);
    }
    req.end();
  });
