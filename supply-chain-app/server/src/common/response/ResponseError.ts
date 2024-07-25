import HttpStatusCode from "../constants/HttpStatusCode";

class ResponseError {
  public readonly httpCode: HttpStatusCode;
  public readonly message: string;
  public readonly errors: string[];

  constructor(httpCode?: HttpStatusCode, message?:string, errors?: any[]) {
    this.httpCode = httpCode;
    this.message = message;
    this.errors = errors;
  }
}

export default ResponseError;
