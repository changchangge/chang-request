import { Service } from './types/service';
import { ObjType } from './types/object-type';
import { Middleware } from './types/middleware';
import { createContext } from './createContext';
import { Context, ResponseContext } from './types/context';
import { ControllerContext } from './types/controller';

const wrapController = (ctx: Context) => () => {
  ctx.response = ctx.response || { status: 0 };
  return ctx.service.controller(ctx as ControllerContext).then(() => undefined);
};

type nextFunc = () => Promise<void>;

const wrapMiddleware = (ctx: Context) => (next: nextFunc, middleware: Middleware) => () => {
  return middleware(ctx, next).then(() => undefined);
};

function request<T = unknown>(
  service: Service,
  params: ObjType = {},
  options: ObjType = {},
  middlewares: Middleware[] = []
): Promise<T> {
  if (!service.controller) {
    return Promise.reject(new Error('You must configure a controller'));
  }

  if (service.middlewares) {
    if (typeof service.middlewares !== 'function') {
      middlewares.push(...service.middlewares);
    } else {
      /**
       * Allow to change the order by function
       * 允许通过传入函数的方式改变顺序
       */
      middlewares = service.middlewares(middlewares);
    }
  }

  const ctx = createContext(service, params, options);

  /**
   * Nest by the onion model
   * 按照洋葱模型进行嵌套
   */

  const entry = middlewares.reduce(wrapMiddleware(ctx), wrapController(ctx));

  // return new Promise((e) => e);
  return entry()
    .then(() => {
      return (ctx.response as ResponseContext).body as T;
    })
    .catch((error) => {
      if (ctx.response) {
        error.status = ctx.response.status !== 0 ? ctx.response.status : -1;
        error.body = ctx.response.body;
      } else {
        error.status = -1;
      }
      throw error;
    });
}

export default request;
