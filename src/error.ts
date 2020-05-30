import * as httpStatusCodes from "http-status-codes";

export class SubError {
  constructor(public field: string, public message: string) {}
}

export class HttpError extends Error {
  constructor(
    message: string,
    public code: number = httpStatusCodes.BAD_REQUEST,
    public subErrors: SubError[] = []
  ) {
    super(message);
  }
}
