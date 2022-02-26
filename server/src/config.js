
import dotenv from 'dotenv';
const config = dotenv.config().parsed;

export const DB_CONFIG = {
  host: config ? config.HOST : null,
  port: config ? config.DBPORT : null,
  user: config ? config.USER : null,
  password: config ? config.PASSWORD : null,
  database: config ? config.DATABASE : null,
};

export const serverPORT = config ? config.PORT : null;

export const PRIVATE_KEY = config ? config.PRIVATE_KEY : null;
