import * as httpStatusCodes from "http-status-codes";
import { Context, Next } from "koa";
import { HttpError } from "../error";
import { ErrorResponse } from "../errorResponse";

type LogFn = (error: Error) => void | Promise<void>;

export const errorHandler = (log?: LogFn) => async (
  ctx: Context,
  next: Next
) => {
  try {
    await next();
  } catch (err) {
    if (log) {
      log(err);
    }

    const error = err as HttpError;

    const {
      message,
      status = httpStatusCodes.INTERNAL_SERVER_ERROR,
      subErrors,
    } = error;

    const response: ErrorResponse = {
      message:
        status === httpStatusCodes.INTERNAL_SERVER_ERROR
          ? httpStatusCodes.getStatusText(httpStatusCodes.INTERNAL_SERVER_ERROR)
          : message,
      status,
      subErrors,
      timestamp: new Date(),
    };

    ctx.body = response;
  }
};
