import * as httpStatusCodes from "http-status-codes";
import { SubError } from "./error";

export class ErrorResponse {
  constructor(
    public message: string,
    public status: number = httpStatusCodes.BAD_REQUEST,
    public subErrors: SubError[] = [],
    public timestamp: Date
  ) {}
}
