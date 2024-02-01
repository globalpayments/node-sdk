import * as fs from "fs";
import * as fsPromises from "fs/promises";

export class Logger {
  public static INFO_LOG_LEVEL = "info";

  logLevels: Record<string, string> = {
    info: "info",
    warn: "warn",
    error: "error",
    fatal: "fatal",
  };

  private options: any = {
    extension: "txt",
    dateFormat: "Y-m-d G:i:s.u",
    filename: false,
    flushFrequency: false,
    prefix: "log_",
    logFormat: false,
    appendContext: true,
  };

  private queue: Map<number, string[]> = new Map<number, string[]>();

  private logFilePath: string;
  private logLineCount: number = 0;
  private fileHandleSync: number;
  private fileHandle: fsPromises.FileHandle;
  private lastLine: string = "";

  constructor(logDirectory: string) {
    logDirectory = logDirectory.replace(/[\\\/]$/, ""); // rtrim

    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory, {
        recursive: true,
      });
    }

    this.setLogFilePath(logDirectory);

    if (fs.existsSync(this.logFilePath) && !fs.constants.W_OK) {
      throw new Error(
        "The file could not be written to. Check that appropriate permissions have been set.",
      );
    }

    this.setFileHandleSync("a");

    if (!this.fileHandleSync) {
      throw new Error("The file could not be opened. Check permissions.");
    }
  }

  setLogToStdOut(stdOutPath: string): void {
    this.logFilePath = stdOutPath;
  }

  setLogFilePath(logDirectory: string): void {
    if (this.options.filename) {
      const filename = this.options.filename;
      const extension = this.options.extension;

      if (filename.includes(".log") || filename.includes(".txt")) {
        this.logFilePath = `${logDirectory}/${filename}`;
      } else {
        this.logFilePath = `${logDirectory}/${filename}.${extension}`;
      }
    } else {
      const prefix = this.options.prefix;
      const dateObj = new Date();
      const date =
        `${dateObj.getFullYear()}-` +
        `${(dateObj.getMonth() + 1).toString().padStart(2, "0")}-` +
        `${dateObj.getUTCDate().toString().padStart(2, "0")}`;

      this.logFilePath = `${logDirectory}/${prefix}${date}.${this.options.extension}`;
    }
  }

  setFileHandleSync(writeMode: fs.Mode) {
    this.fileHandleSync = fs.openSync(this.logFilePath, writeMode);
  }

  async setFileHandle(writeMode: fs.Mode) {
    this.fileHandle = await fsPromises.open(this.logFilePath, writeMode);
  }

  setDateFormat(dateFormat: string): void {
    this.options.dateFormat = dateFormat;
  }

  queueLog(
    level: string | number,
    requestId: number,
    message: string,
    context: Record<string, any> = {},
  ): void {
    const formattedMessage = this.formatMessage(level, message, context);

    this.pushToQueueLog(requestId, formattedMessage);
  }

  async log(requestId: number): Promise<void> {
    const queuedLogs = this.queue.get(requestId);
    if (queuedLogs) {
      await this.write(queuedLogs.join(""));
    }
  }

  private pushToQueueLog(requestId: number, formattedMessage: string) {
    if (!this.queue.get(requestId)) {
      this.queue.set(requestId, [formattedMessage]);
      return;
    }

    this.queue.get(requestId)?.push(formattedMessage);
  }

  async write(message: string): Promise<void> {
    if (this.fileHandleSync !== null) {
      try {
        await this.setFileHandle("a");
        await fsPromises.appendFile(this.fileHandle, message);
        this.lastLine = message.trim();
        this.logLineCount++;

        if (
          this.options.flushFrequency &&
          this.logLineCount % this.options.flushFrequency === 0
        ) {
          await this.fileHandle.datasync();
        }
      } catch (error) {
        throw new Error(
          "The file could not be written to. Check that appropriate permissions have been set.",
        );
      }
    }
  }

  getLogFilePath(): string {
    return this.logFilePath;
  }

  getLastLogLine(): string {
    return this.lastLine;
  }

  formatMessage(
    level: string | number,
    message: string,
    context: Record<string, any>,
  ): string {
    let formattedMessage;
    if (this.options.logFormat) {
      const parts: Record<string, any> = {
        date: this.getTimestamp(),
        level: String(level).toUpperCase(),
        "level-padding": " ".repeat(9 - String(level).length),
        priority: this.logLevels[level],
        message,
        context: JSON.stringify(context),
      };

      let formattedMessage = this.options.logFormat;

      for (const [part, value] of Object.entries(parts)) {
        formattedMessage = formattedMessage.replace(`{${part}}`, value);
      }
    } else {
      formattedMessage = `[${this.getTimestamp()}] [${level}] ${message}`;
    }

    if (this.options.appendContext && Object.keys(context).length > 0) {
      formattedMessage += `\n${this.indent(this.contextToString(context))}`;
    }

    return `${formattedMessage}\n`;
  }

  private getTimestamp(): string {
    const dateObj = new Date();

    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getUTCDate().toString().padStart(2, "0");
    const hour = (dateObj.getUTCHours() - dateObj.getTimezoneOffset() / 60)
      .toString()
      .padStart(2, "0");
    const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");
    const seconds = dateObj.getUTCSeconds().toString().padStart(2, "0");
    const date =
      `${dateObj.getFullYear()}-${month}-${day} ` +
      `${hour}:${minutes}:${seconds}`;

    return date;
  }

  private contextToString(context: Record<string, any>): string {
    let exportString = "";

    for (const [key, value] of Object.entries(context)) {
      exportString += `${key}: `;
      exportString += String(value)
        .replace(/=>\s+([a-zA-Z])/g, "=> $1")
        .replace(/array\(\s+\)/g, "array()")
        .replace(/^  |\G  /gm, "    ")
        .replace(/array \(/g, "array(");
      exportString += "\n";
    }

    return exportString.replace(/\\\\|\\'/g, "\\$1").replace(/\s+$/g, "");
  }

  private indent(string: string, indent: string = "    "): string {
    return indent + string.replace(/\n/g, `\n${indent}`);
  }

  async info(
    message: string,
    requestId: number,
    context: Record<string, any> = {},
    queue: boolean,
  ): Promise<void> {
    this.queueLog("INFO_LOG_LEVEL", requestId, message, context);
    if (!queue) {
      await this.log(requestId);
    }
  }
}
