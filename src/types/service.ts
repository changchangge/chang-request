import { Middleware } from './middleware';

type MiddlewareFn = (requsetMiddwares: Middleware[]) => Middleware[];

/**
 * @interface ServiceConfig
 */
interface ServiceConfig {
  /**
   * Request Controller
   * 请求控制器
   */
  controller: unknown;

  /**
   * Request Middlewares
   * 请求中间件
   */
  middlewares?: MiddlewareFn | Middleware[];

  /**
   * Request DefaultParams
   * 请求默认参数
   */
  defaultParams?: unknown;

  /**
   * Other Params(will be inject middleswares)
   * 其它参数（会被注入到中间件中）
   */
  [key: string]: unknown;
}

export type Service = ServiceConfig;
