import { NextFunction, Request, Response } from 'express';
import { UserConst } from '../consts';
const isDev = process.env.NODE_ENV !== 'production';

export function userRequest(req: Request, res: Response, next: NextFunction) {
  if (isDev) {
    req['user'] = UserConst;
  } else {
    req['user'] = {
      NhanVienID: req.header('X-UserID'),
      NhanVienGuid: req.header('X-UserGuid'),
      app: req.header('X-APP'),
      id: req.header('X-ContactId'),
      // crm_key: Config.CRM_KEY_DEFAULT,
    };
  }

  next();
}
