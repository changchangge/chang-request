import { Service } from './types/service';
import { ObjType } from './types/object-type';
import { Middleware } from './types/middleware';
import { createContext } from './createContext';
import { Context } from './types/context';

const wrapController = (ctx: Context) => () => {
  ctx.response = ctx.response || { status: 0 };
  // return ctx.service.controller(ctx)
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

  // const entry = middlewares.reduce();

  return new Promise((e) => e);
}

export default request;
