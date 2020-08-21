import { Service } from './service';
import { ObjType } from './object-type';

interface RequestContext extends ObjType {
  params: ObjType;
}

export interface ResponseContext extends ObjType {
  status: number | string;
  body?: unknown;
}

export interface Context {
  service: Service;
  request: RequestContext;
  response?: ResponseContext;
}
