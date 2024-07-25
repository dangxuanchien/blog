import HttpStatusCode from "./HttpStatusCode";

export const MessagesConstants = {
  GET_BUSINESS_SUCCESS: 'Get business conditions success.',
  COMPARE_PRICE_SUCCESS: 'Get data compare price success.',
  SEARCH_COMPANY_SUCCESS: 'Search company data success.',
  LOGIN_SUCCESS: 'Login successfully.',
  DATABASE_MIGRATION_SUCCESS:'PostgreSQL Database Migration Successfully!',
  DATABASE_MIGRATION_ERROR: 'PostgreSQL Database Migration Error: ',
  TOKEN_INVALID: 'Token is invalid.',
  LOGIN_PASSWORD_INCORRECT: 'Login Id or password is incorrect.',
  INVALID_INPUT_DATA: 'Invalid input data.',
  GET_WEIGHT_INFO_SUCCESS: 'Get data by id of weight info success.',
  UPDATE_WEIGHT_INFO_SUCCESS: 'Update weight info success.',
  PARAMETER_DETAILS_SUCCESS: 'Get data parameter details success',
  SEARCH_DETAIL_COMPANY_SUCCESS: 'Get data detail company success.',
  GET_PARAMETERS: 'Get parameters success.',
}

export const MessagesValidation = {
  LOGINID_PASSWORD_REQUIRED: 'LoginId and Password must be required'
}

export const RESPONSE_CODES = {
  OK: HttpStatusCode.OK,
  SERVER_ERROR: HttpStatusCode.INTERNAL_SERVER_ERROR,
};

export const RESPONSE_MESSAGES = {
  EMPTY_REQUEST: "Request body is empty",
  SAVE_SUCCESS: "Transaction saved successfully",
  SERVER_ERROR: "Internal server error",
  TRANSACTION_ERROR: "Error saving transaction",
  COMPANY_ERROR: "Error saving company",
};
