import * as httpStatusCodes from "http-status-codes";
import { plainToClass } from "class-transformer";
import { Validator } from "class-validator";
import { IMiddleware } from "koa-router";
import { Handler } from "../custom";
import { HttpError } from "../error";

type Constructor<T> = { new (): T };

export const validateBody: <T>(type: Constructor<T>) => Handler = <T>(
  type: Constructor<T>
) => {
  const validator = new Validator();
  return async (ctx, next) => {
    const data = plainToClass(type, ctx.request.body);

    const errs = await validator.validate(data);
    if (errs.length > 0) {
      throw new HttpError(
        httpStatusCodes.getStatusText(httpStatusCodes.UNPROCESSABLE_ENTITY),
        httpStatusCodes.UNPROCESSABLE_ENTITY,
        errs.map((x) => ({
          field: x.property,
          message: Object.values(x.constraints as object).join(", "),
        }))
      );
    }

    ctx.request.body = data;
    return next();
  };
};
