
import HttpStatusCode from '@/common/constants/HttpStatusCode';
import { MessagesConstants } from '../../common/constants/MessagesConstants';
import { logging, logLevel } from '@/common/log/Logging';
import ResponseError from '@/common/response/ResponseError';
import ResponseSuccess from '@/common/response/ResponseSuccess';
import MasterService from '@/modules/master/MasterService';
import { Request, Response } from 'express';

class MasterController {

  /**
   * It takes the request body and passes it to the updateEvaluationDignity function in the
   * EvaluationDignityService
   * @param {Request} req - Request - This is the request object that contains the request data.
   * @param {Response} res - Response - This is the response object that will be sent back to the
   * client.
   * @returns The response is being returned.
   */
  async updateWeightInfo(req: Request, res: Response) {
    try {
      const { userId } = req.session; 
      const data = await MasterService.saveWeightInfo(userId, req.body);
      logging(logLevel.INFO, MessagesConstants.UPDATE_WEIGHT_INFO_SUCCESS);
      return res.status(HttpStatusCode.OK).json(new ResponseSuccess(
        HttpStatusCode.OK, 
        data, 
        MessagesConstants.UPDATE_WEIGHT_INFO_SUCCESS
      ));
    } catch (error) {
      logging(logLevel.ERROR, error.message);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(new ResponseError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        error.message,
      ));
    }
  }

  /**
   * It gets the evaluation dignity by user id
   * @param {Request} req - Request - The request object.
   * @param {Response} res - Response - This is the response object that will be sent back to the
   * client.
   * @returns The response is being returned.
   */
  async getByIdWeightInfo(req: Request, res: Response) {
    try {
      const { userId } = req.session; //TODO: should get from session
      const data = await MasterService.getByIdWeightInfo(userId);
      logging(logLevel.INFO, MessagesConstants.GET_WEIGHT_INFO_SUCCESS);
      return res.status(HttpStatusCode.OK).json(new ResponseSuccess(
        HttpStatusCode.OK, 
        data, 
        MessagesConstants.GET_WEIGHT_INFO_SUCCESS
      ));
    } catch (error) {
      logging(logLevel.ERROR, error.message);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(new ResponseError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        error.message,
      ));
    }
  }

  async getSearchCondition(req: Request, res: Response) {
    try {
      const result = await MasterService.getSearchCondition(req.body);
      logging(logLevel.INFO, MessagesConstants.SEARCH_COMPANY_SUCCESS);
      return res
        .status(HttpStatusCode.OK)
        .json(new ResponseSuccess(HttpStatusCode.OK, result, MessagesConstants.SEARCH_COMPANY_SUCCESS));
    } catch (error) {
      logging(logLevel.ERROR, error.message);
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(new ResponseError(HttpStatusCode.INTERNAL_SERVER_ERROR, error.message));
    }
  }
}
export default new MasterController();