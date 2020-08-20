import { Context } from './context';

export type Middleware = (ctx: Context) => Promise<void>;
