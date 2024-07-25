/**
 * Log level
 */
/* eslint-disable */

const enum LOG_LEVEL {
  DEBUG = '5', // BFP5xx
  INFO = '0', // BFP0xxx
  WARN = '7', // BFP7xxx
  ERROR = '8', // BFP8xxx
  CRIT = '9' // BFP9xxx
}

/**
   * Message list
   */
export enum MessageCode {
  CLIENT_REQUEST = 'BFP001001',
  CLIENT_DISPLAY = 'BFP001002',
  API_START = 'BFP001003',
  API_END = 'BFP001004',
  CONFIG = 'BFP001005',
  CONFIG_USE_DEFAULT_VALUE = 'BFP701001',
  API_EXE_ERROR = 'BFP801001',
  INVALID_PAGE_ACCESS_ERROR = 'BFP801002',
  AUTHENTICATION_ERROR = 'BFP801003',
  UNEXPECTED_ERROR = 'BFP901001',
  DEBUG = 'BFP501'
}
/* eslint-disable */

const MessageFormat = new Map<string, string>([
  [
    MessageCode.CLIENT_REQUEST, 'Request: %s, %s, %s  ',
  ],
  [
    MessageCode.CLIENT_DISPLAY, 'Display: %s, %s, %s'
  ],
  [
    MessageCode.API_START, 'API execution start: %s, %s, %s'
  ],
  [
    MessageCode.API_END, 'API execution end: %s, %s, %s'
  ],
  [
    MessageCode.CONFIG, 'Config: %s'
  ],
  [
    MessageCode.CONFIG_USE_DEFAULT_VALUE, 'Use default value, because setting format error. key : %s, value : %s, default : %s'
  ],
  [
    MessageCode.API_EXE_ERROR, 'API execution error: %s, %s, %s'
  ],
  [
    MessageCode.INVALID_PAGE_ACCESS_ERROR, '404 not found: %s, %s'
  ],
  [
    MessageCode.AUTHENTICATION_ERROR, 'Authentication error: %s'
  ],
  [
    MessageCode.UNEXPECTED_ERROR, 'Unexpected error: %s, %s'
  ],
  [
    MessageCode.DEBUG, '%s'
  ]
]);

/** 
 * Log function
 * @param code massage code
 * @param msg detail according to the defined format
 * @author Tung Pham Nhat <tung.pham@hitachivantara.com>
 */
const log = (code : MessageCode, ...msg : string[]) : void => {
  const levelStr = code.slice(3, 4); // Get log level
  switch (levelStr) {
    case LOG_LEVEL.INFO:
      console.info(`[APL],<I>,${code},${
        MessageFormat.get(code)
      }`, ...msg);
      break;
    case LOG_LEVEL.WARN:
      console.warn(`[APL],<W>,${code},${
        MessageFormat.get(code)
      }`, ...msg);
      break;
    case LOG_LEVEL.ERROR:
      console.error(`[APL],<E>,${code},${
        MessageFormat.get(code)
      }`, ...msg);
      break;
    case LOG_LEVEL.CRIT:
      console.error(`[APL],<C>,${code},${
        MessageFormat.get(code)
      }`, ...msg);
      break;
    case LOG_LEVEL.DEBUG:
      console.debug(`[APL],<D>,${code},${
        MessageFormat.get(code)
      }`, ...msg);
      break;
    default:
      break;
  }
};
export default log;
