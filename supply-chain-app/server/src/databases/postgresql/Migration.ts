import { MessagesConstants } from '../../common/constants/MessagesConstants';
import { logging, logLevel } from '@/common/log/Logging';
import { AppDataSource } from './AppDataSource';

const startPostgreSQLDatabaseMigration = async () => {
  return AppDataSource.initialize()
    .then(async () => {
      logging(logLevel.INFO, MessagesConstants.DATABASE_MIGRATION_SUCCESS);
    })
    .catch((error: any) => {
      logging(logLevel.ERROR, `${MessagesConstants.DATABASE_MIGRATION_ERROR} ${error.message}`);
      process.exit(1);
    });
};

export default startPostgreSQLDatabaseMigration;
