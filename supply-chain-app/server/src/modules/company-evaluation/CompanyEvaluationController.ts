import HttpStatusCode from '@/common/constants/HttpStatusCode';
import { Request, Response } from 'express';
import ResponseSuccess from '@/common/response/ResponseSuccess';
import ResponseError from '@/common/response/ResponseError';
import { MessagesConstants } from '../../common/constants/MessagesConstants';
import { logging, logLevel } from '@/common/log/Logging';
import SearchCompanyService from '@/services/company-evaluation/SearchCompanyService';
import DetailCompanyService from '@/services/company-evaluation/DetailCompanyService';
import CompanyEvaluationService from '@/services/company-evaluation/CompanyEvaluationService';
import AchivementService from '@/services/company-evaluation/AchivementService';
import DetailQcdService from '@/services/company-evaluation/DetailQcdService';

class CompanyEvaluationController {
  /**
   * It takes in a request body, and returns a response body
   * @param {Request} req - Request - The request object.
   * @param {Response} res - Response - The response object that will be returned to the user.
   * @returns the data from the searchCompanyService.searchCompany function.
   */
  async searchCompany(req: Request, res: Response) {
    try {
      const data = await SearchCompanyService.searchCompany(req.body);
      logging(logLevel.INFO, MessagesConstants.SEARCH_COMPANY_SUCCESS);
      return res.status(HttpStatusCode.OK).json(new ResponseSuccess(
        HttpStatusCode.OK, 
        data, 
        MessagesConstants.SEARCH_COMPANY_SUCCESS
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
  * It takes in a request and a response object, and returns a response object with a status code and a
  * message
  * @param {Request} req - Request - This is the request object that contains the request data.
  * @param {Response} res - Response - This is the response object that will be sent back to the
  * client.
  * @returns The priceCompare function is being returned.
  */

  /**
   * 
   * @param req 
   * @param res 
   * @returns 
   */
  async detailCompany(req: Request, res: Response) {
    try {
      const data = await DetailCompanyService.searchCompanyDetail(req.body);
      logging(logLevel.INFO, MessagesConstants.SEARCH_DETAIL_COMPANY_SUCCESS);
      return res.status(HttpStatusCode.OK).json(new ResponseSuccess(
        HttpStatusCode.OK, 
        data, 
        MessagesConstants.SEARCH_DETAIL_COMPANY_SUCCESS
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
  * It takes in a request and a response object, and returns a response object with a status code and a
  * message
  * @param {Request} req - Request - This is the request object that contains the request data.
  * @param {Response} res - Response - This is the response object that will be sent back to the
  * client.
  * @returns The priceCompare function is being returned.
  */
  async priceCompare(req: Request, res: Response) {
    try {
      const data = await CompanyEvaluationService.priceCompare(req.body);
      logging(logLevel.INFO, MessagesConstants.COMPARE_PRICE_SUCCESS);
      return res.status(HttpStatusCode.OK).json(new ResponseSuccess(
        HttpStatusCode.OK, 
        data, 
        MessagesConstants.COMPARE_PRICE_SUCCESS
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
  * It takes in a request and a response object, and returns a response object with a status code and a
  * message
  * @param {Request} req - Request - This is the request object that contains the request data.
  * @param {Response} res - Response - This is the response object that will be sent back to the
  * client.
  * @returns The priceCompare function is being returned.
  */
    async achivementDetails(req: Request, res: Response) {
      try {
        const data = await AchivementService.parameterDetail(req.body)
        return res.status(HttpStatusCode.OK).json(new ResponseSuccess(
          HttpStatusCode.OK, 
          data, 
          MessagesConstants.PARAMETER_DETAILS_SUCCESS
        ));
      }
    catch (err) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(new ResponseError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        err.message,
      ));
    }
  };

  async getParameters(req: Request, res: Response) {
    try {
      const data = await DetailQcdService.getParameters(req.body);
      logging(logLevel.INFO, MessagesConstants.GET_PARAMETERS);
      return res
        .status(HttpStatusCode.OK)
        .json(new ResponseSuccess(HttpStatusCode.OK, data, MessagesConstants.GET_PARAMETERS));
    } catch (error) {
      logging(logLevel.ERROR, error.message);
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(new ResponseError(HttpStatusCode.INTERNAL_SERVER_ERROR, error.message));
    }
  };

  async qcdParameter(req: Request, res: Response) {
    try {
      const data = await DetailQcdService.qcdParameter(req.body);
      logging(logLevel.INFO, MessagesConstants.COMPARE_PRICE_SUCCESS);
      return res.status(HttpStatusCode.OK).json(new ResponseSuccess(
        HttpStatusCode.OK, 
        data, 
        MessagesConstants.COMPARE_PRICE_SUCCESS
      ));
    } catch (error) {
      logging(logLevel.ERROR, error.message);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(new ResponseError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        error.message,
      ));
    }
  }

  async qcdRelevant(req: Request, res: Response) {
    try {
      const data = await DetailQcdService.qcdRelevant(req.body);
      logging(logLevel.INFO, MessagesConstants.COMPARE_PRICE_SUCCESS);
      return res.status(HttpStatusCode.OK).json(new ResponseSuccess(
        HttpStatusCode.OK, 
        data, 
        MessagesConstants.COMPARE_PRICE_SUCCESS
      ));
    } catch (error) {
      logging(logLevel.ERROR, error.message);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(new ResponseError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        error.message,
      ));
    }
  }
}

export default new CompanyEvaluationController();
