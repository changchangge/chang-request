import { Context, ResponseContext } from './context';

export interface ControllerContext extends Context {
  response: ResponseContext;
}

export type Controller = (ctx: ControllerContext) => Promise<void>;
