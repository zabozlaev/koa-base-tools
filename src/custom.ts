import { Middleware } from "koa";

export interface JwtPayload {
  id: string;
}

export interface State {
  authData?: JwtPayload;
}

export type Handler = Middleware<State>;
