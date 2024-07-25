import HttpStatusCode from "../constants/HttpStatusCode";

class ResponseSuccess {
  public readonly httpCode: HttpStatusCode;
  public readonly data: any;
  public readonly message: string;

  constructor(httpCode?: HttpStatusCode, data?: any, message?: string) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }
}

export default ResponseSuccess;
