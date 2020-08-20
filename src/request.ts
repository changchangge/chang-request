import { Service } from './types/service';
import { ObjType } from './types/object-type';

function request<T = unknown>(
  service: Service,
  params?: ObjType,
  options: ObjType = {},
  middlewares?: []
): Promise<T> {
  if (!service.controller) {
    return Promise.reject(new Error('You must configure a controller'));
  }
  return new Promise((e) => e);
}

export default request;
