import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import startPostgreSQLDatabaseMigration from './databases/postgresql/Migration';
import router from './routes';
import ConfigEnv from './common/configs/ConfigEnv';
import { logging, logLevel } from './common/log/Logging';

class App {
  public app;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(
      express.json({
        type: 'application/octet-stream',
        limit: '500mb',
      })
    );
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use(ConfigEnv.contextPath, router);
  }
}

const createInstance = async () => {
  // starting migrate to database
  await startPostgreSQLDatabaseMigration();

  // Create instance app
  const instance = new App();
  const PORT = ConfigEnv.portServer;

  instance.app.listen(PORT, () => {
    logging(logLevel.INFO, `Server running on port: ${PORT}`);
  });
  return instance;
};

export default createInstance;
