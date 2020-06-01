import { Handler } from "../custom";
import { jwtService } from "../services";

export const authData: Handler = async (ctx, next) => {
  const token = ctx.cookies.get(process.env.TOKEN_PREFIX!);
  if (token) {
    const authData = await jwtService.verifyToken(token);
    ctx.state.authData = authData;
  }

  return next();
};
