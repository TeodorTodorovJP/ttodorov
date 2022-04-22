import { DB_CONFIG } from '../config.js';
import mariadb from 'mariadb';

const pool = mariadb.createPool(process.env.JAWSDB_MARIA_URL || DB_CONFIG);

export default pool;
