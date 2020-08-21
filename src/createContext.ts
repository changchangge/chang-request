import { Service } from './types/service';
import { ObjType } from './types/object-type';
import { Context } from './types/context';

function createContext(service: Service, params?: ObjType, options?: ObjType): Context {
  return {
    service: Object.assign({}, service, options),
    request: {
      params: Object.assign({}, service.defaultParams, params),
    },
  };
}

export { createContext };
