import { Response, Request } from 'express';

export interface BodyResponse {
  HttpStatuscode: number;
  data?: Object;
  errors?: Object[];
}
export interface Session {
  loginId: string;
  userId?: string;
}
declare module 'express' {
  interface Request {
    session: Session;
  }
}
export type ResponseCustom = Response<BodyResponse>;
