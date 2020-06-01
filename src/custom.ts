import { Middleware, Request, ExtendableContext } from "koa";
import { IMiddleware } from "koa-router";

export interface Context extends ExtendableContext {
  request: Request & { body: any };
}

export interface JwtPayload {
  id: string;
}

export interface State {
  authData?: JwtPayload;
}

export type Handler = IMiddleware<State, Context>;
