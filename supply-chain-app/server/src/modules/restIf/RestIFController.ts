import HttpStatusCode from '@/common/constants/HttpStatusCode';
import { RESPONSE_CODES, RESPONSE_MESSAGES } from '@/common/constants/MessagesConstants';
import { logging, logLevel } from '@/common/log/Logging';
import ResponseError from '@/common/response/ResponseError';
import ResponseSuccess from '@/common/response/ResponseSuccess';
import { EvaluationDataDto } from '@/modules/restIf/RestIFDto';
import RestIfService from '@/modules/restIf/RestIFService';
import { ReadableStream } from '@/utils/readableStream';
import { Request, Response } from 'express';
class RestIfController {
  /**
   * add companies infor
   */
  async addCompanyInfor(req: Request, res: Response) {
    if (!req.body || req.body.length === 0) {
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(new ResponseError(RESPONSE_CODES.SERVER_ERROR, RESPONSE_MESSAGES.EMPTY_REQUEST));
    }
    try {
      await RestIfService.addCompanyInfors(req.body);
      logging(logLevel.INFO, RESPONSE_MESSAGES.SAVE_SUCCESS);
      return res
        .status(HttpStatusCode.OK)
        .json(new ResponseSuccess(HttpStatusCode.OK, undefined, RESPONSE_MESSAGES.SAVE_SUCCESS));
    } catch (error) {
      logging(logLevel.ERROR, error.message);
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(new ResponseError(HttpStatusCode.INTERNAL_SERVER_ERROR, error.message));
    }
  }

  /**
   * add transactions infor
   */
  async addTransactionInfor(req: Request, res: Response) {
    const { body } = req;
    if (!body || body.length === 0) {
      return res
        .status(RESPONSE_CODES.SERVER_ERROR)
        .json(new ResponseError(RESPONSE_CODES.SERVER_ERROR, RESPONSE_MESSAGES.EMPTY_REQUEST));
    }

    try {
      await RestIfService.addTransactions(body);
      logging(logLevel.INFO, RESPONSE_MESSAGES.SAVE_SUCCESS);
      return res
        .status(RESPONSE_CODES.OK)
        .json(new ResponseSuccess(RESPONSE_CODES.OK, undefined, RESPONSE_MESSAGES.SAVE_SUCCESS));
    } catch (error) {
      logging(logLevel.ERROR, error.message);
      return res
        .status(RESPONSE_CODES.SERVER_ERROR)
        .json(new ResponseError(RESPONSE_CODES.SERVER_ERROR, RESPONSE_MESSAGES.SERVER_ERROR));
    }
  }

  /**
   * Insert Evaluation data
   * @author Viet Phan - <phan.viet@hitachivantara.com>
   * @function
   * @param {Request} req - Request received from client
   * @param {Response} res - Send response to client from the server
   */
  async insertEvaluationData(req: Request, res: Response) {
    try {
      await RestIfService.insertEvaluationData(req.body as EvaluationDataDto);
      return res
        .status(HttpStatusCode.OK)
        .json(new ResponseSuccess(HttpStatusCode.OK, undefined, RESPONSE_MESSAGES.SAVE_SUCCESS));
    } catch (error) {
      logging(logLevel.ERROR, error.message);
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(new ResponseError(HttpStatusCode.INTERNAL_SERVER_ERROR, error.message));
    }
  }
  /**
   * Get data categories from item_information, item_category_information, item_category_group_information
   * @author MinhHuynh - <minh.huynh@hitachivantara.com>
   * @function
   * @param {Request} req - Request from client
   * @param {Response} res - Response from server
   */

  async categories(req: Request, res: Response) {
    try {
      const data = await RestIfService.getDetailCategories();
      const dataFormat = {
        httpStatusCode: HttpStatusCode.OK,
        data: data,
      };
      const stream = new ReadableStream(JSON.stringify(dataFormat), {
        objectMode: true,
        highWaterMark: 1024 * 1024 * 20,
      });
      stream.pipe(res);
    } catch (err) {
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(new ResponseError(HttpStatusCode.INTERNAL_SERVER_ERROR, err.message));
    }
  }
}

export default new RestIfController();
