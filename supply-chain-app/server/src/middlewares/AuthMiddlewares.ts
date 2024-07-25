import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../common/configs/ConfigEnv';
import HttpStatusCode from '../common/constants/HttpStatusCode';
import ResponseError from '@/common/response/ResponseError';
import { MessagesConstants } from '../common/constants/MessagesConstants';
import { logging, logLevel } from '@/common/log/Logging';
/**
 * It checks if the user is authenticated by checking if the token is valid
 * @param {Request} req - Request - The request object.
 * @param {ResponseCustom} res - ResponseCustom - This is the response object that we will be sending
 * back to the client.
 * @param {NextFunction} next - This is a function that you call when you want to move on to the next
 * middleware.
 * @returns A function that takes in a request, response, and next function.
 */
export const AuthMiddlewares = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1] || (req.query.token as string);
    if(!token) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json(new ResponseError(
        HttpStatusCode.UNAUTHORIZED,
        MessagesConstants.TOKEN_INVALID,
      ));
    }
    // TODO: Should be const token = req.header('Authorization').replace('Bearer ', '')
    jwt.verify(token, config.JWTSecretKey, (err: any, user: Request['session']) => {
      if (err) {
        throw new Error(MessagesConstants.TOKEN_INVALID);
      }
      req.session = user;
      next();
    });

    return true;
  } catch (error) {
    logging(logLevel.ERROR, error.message);
    return res.status(HttpStatusCode.UNAUTHORIZED).json(new ResponseError(
      HttpStatusCode.UNAUTHORIZED,
      error.message,
    ));
  }
};
