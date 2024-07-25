import log4js from 'log4js';
import logConstant from './LogConstant';
const {config} = logConstant;
/**
 * config
 */
log4js.configure({
  appenders: {
    out: {type: `${config.type}`},
    file: {
      type: `${config.typeFile}`,
      filename: `${config.filepath}/${config.log}`, // filename
      pattern: `${config.pattern}.log`,
      alwaysIncludePattern: true,
      maxLogSize: 10485760,
      backups: `${config.backup}`,
    },
  },
  categories: {
    default: {appenders: ['out', 'file'], level: config.logLevel},
  },
});

/**
 * Log level
 */
const logLevel = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  FATAL: 3,
  DEBUG: 4,
  TRACE: 5,
};

/**
 * Log function
 */
const logging = (level: number, message: string) => {
  const logger = log4js.getLogger(`[${config.log}]`);

  switch (level) {
    case logLevel.INFO:
      logger.info(`${message}`);
      break;
    case logLevel.WARN:
      logger.warn(`${message}`);
      break;
    case logLevel.DEBUG:
      logger.debug(`${message}`);
      break;
    case logLevel.ERROR:
      logger.error(`${message}`);
      break;
    case logLevel.FATAL:
      logger.fatal(`${message}`);
      break;
    case logLevel.TRACE:
      logger.trace(`${message}`);
      break;
    default:
      break;
  }
};

export {logging, logLevel};
