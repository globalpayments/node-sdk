import * as https from "https";
import { Socket } from "net";

import { ApiError, GatewayError } from "../Entities/Errors";
import { createGunzip } from "zlib";
import { GatewayResponse } from "./GatewayResponse";

export const request = (
  data?: string,
  options?: https.RequestOptions,
): Promise<GatewayResponse> =>
  new Promise((resolve, reject) => {
    if (options === undefined) {
      options = {};
    }

    const req = https.request(options, (res) => {
      let responseData = "";
      const buffer: string[] = [];

      if (res.headers["content-encoding"] == "gzip") {
        const gunzip = createGunzip();

        res.pipe(gunzip);

        gunzip
          .on("data", function (data) {
            // decompression chunk ready, add it to the buffer
            buffer.push(data.toString());
          })
          .on("end", function () {
            // response and decompression complete, join the buffer and return
            resolve(
              new GatewayResponse(res.headers, buffer.join(""), res.statusCode),
            );
          })
          .on("error", function (e) {
            reject(e);
          });
        return;
      }

      res.on("data", (d: string) => (responseData += d));
      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(
            new GatewayError(`Unexpected HTTP status code [${res.statusCode}]`),
          );
        }
        resolve(new GatewayResponse(res.headers, responseData, res.statusCode));
      });
      res.on("error", reject);
    });
    req.on("socket", (socket: Socket) => {
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
