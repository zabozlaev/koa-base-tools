import * as httpStatusCodes from "http-status-codes";
import { Handler } from "../custom";
import { HttpError } from "../error";

export const authProtection: Handler = (ctx, next) => {
  if (!ctx.state.authData) {
    const code = httpStatusCodes.UNAUTHORIZED;
    throw new HttpError(httpStatusCodes.getStatusText(code), code, [
      { message: "You must login" },
    ]);
  }

  return next();
};
