import { Context } from './context';

export type Middleware = (ctx: Context, next: () => Promise<void>) => Promise<void>;
