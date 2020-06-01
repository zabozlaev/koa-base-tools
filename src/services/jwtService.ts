import { verify } from "jsonwebtoken";
import { JwtPayload } from "../custom";

export const verifyToken = (token: string) =>
  new Promise<JwtPayload>((resolve, reject) =>
    verify(token, process.env.JWT_SECRET!, {}, (err, data) =>
      err ? reject(err) : resolve(data as JwtPayload)
    )
  );
