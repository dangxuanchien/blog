import HttpStatusCode from '@/common/constants/HttpStatusCode';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import AuthService from './AuthService';
import ResponseSuccess from '@/common/response/ResponseSuccess';
import ResponseError from '@/common/response/ResponseError';
import { logging, logLevel } from '@/common/log/Logging';
import { MessagesConstants } from '../../common/constants/MessagesConstants';

class AuthController {
  /**
   * It validates the request body, then calls the login function in the AuthService class, and returns
   * the result
   * @param {Request} req - Request - This is the request object that contains the data sent by the
   * client.
   * @param {ResponseCustom} res - ResponseCustom - This is the response object that will be returned
   * to the client.
   * @returns a response with the status code and the data.
   */
  async login(req: Request, res: Response) {
    try {
      const resultErrors = validationResult(req);

      if (!resultErrors.isEmpty()) {
        logging(logLevel.ERROR, MessagesConstants.INVALID_INPUT_DATA);
        return res.status(HttpStatusCode.BAD_REQUEST).json(new ResponseError(
          HttpStatusCode.BAD_REQUEST,
          '',
          resultErrors.array(),
        ));
      }

      const data = await AuthService.login(req.body);
      logging(logLevel.INFO, MessagesConstants.LOGIN_SUCCESS);
      return res.status(HttpStatusCode.OK).json(new ResponseSuccess(
        HttpStatusCode.OK,
        data,
        MessagesConstants.LOGIN_SUCCESS
      ));
    } catch (error) {
      logging(logLevel.ERROR, error.message);
      return res.status(HttpStatusCode.BAD_REQUEST).json(new ResponseError(
        HttpStatusCode.BAD_REQUEST,
        error.message,
      ));
    }
  }

  /**
   * The function is an async function that takes in a request and a response object. It returns a
   * response object with a status of 200 and a json object with a key of HttpStatuscode and a value of
   * 200 and a key of data and a value of the session object
   * @param {Request} req - Request - This is the request object that is passed to the route handler.
   * @param {Response} res - Response - This is the response object that will be sent back to the
   * client.
   * @returns The session data
   */
  async getSessions(req: Request, res: Response) {
    return res.status(HttpStatusCode.OK).json(new ResponseSuccess(
      HttpStatusCode.OK,
      req.session,
    ));
  }
}

export default new AuthController();
