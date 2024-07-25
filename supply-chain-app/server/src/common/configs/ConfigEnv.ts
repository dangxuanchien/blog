import { DataSourceOptions } from 'typeorm';
import { ENV } from '../interfaces/env';

class ConfigEnv {
  /**
   * It takes a key of type keyof ENV and returns a string
   * @param key - keyof ENV
   * @returns The value of the environment variable.
   */
  getEnv(key: keyof ENV): string {
    if (!process.env[key]) {
      throw new Error(key + ' environment variable does not set');
    }
    return process.env[key];
  }

  /**
   * It returns the value of the environment variable with the name passed in as an argument
   * @returns The value of the environment variable JWT_SECRET_KEY
   */
  get JWTSecretKey(): string {
    return this.getEnv('JWT_SECRET_KEY');
  }

  /**
   * It returns a DataSourceOptions object that contains the database connection information
   * @returns The postgresConfig object is being returned.
   */
  get postgresConfig(): DataSourceOptions {
    return {
      host: this.getEnv('DB_HOST'),
      port: parseInt(this.getEnv('DB_PORT')),
      username: this.getEnv('DB_USERNAME'),
      password: this.getEnv('DB_PASSWORD'),
      database: this.getEnv('DB_DBNAME'),
      type: 'postgres',
      synchronize: this.isProduction ? false : true,
      logging: true,
    };
  }

  /**
   * It returns a boolean value based on the value of the NODE_ENV environment variable.
   * @returns The value of the NODE_ENV environment variable.
   */
  get isProduction(): boolean {
    return this.getEnv('NODE_ENV') === 'production';
  }

  /**
   * It returns the value of the environment variable named CONTEXT_PATH
   * @returns The value of the environment variable CONTEXT_PATH
   */
  get contextPath(): string {
    return this.getEnv('CONTEXT_PATH');
  }

  /**
   * It returns the port number of the server.
   * @returns The port number of the server.
   */
  get portServer(): number {
    return parseInt(this.getEnv('PORT'));
  }
}

export default new ConfigEnv();
