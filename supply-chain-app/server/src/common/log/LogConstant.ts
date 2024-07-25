import dotenv from 'dotenv';
dotenv.config({path: '.env'});
const logConstant = {
  config: {
    log: process.env.LOG4JS,
    logLevel: process.env.LOG_LEVEL,
    pattern: process.env.PATTERN,
    type: process.env.TYPE,
    filepath: process.env.FILE_PATH,
    backup: process.env.BACKUP,
    typeFile: process.env.TYPE_FILE,
  },
};
export default logConstant;
