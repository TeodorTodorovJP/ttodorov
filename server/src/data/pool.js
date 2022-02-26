import { DB_CONFIG } from '../config.js';
import mariadb from 'mariadb';

const pool = mariadb.createPool(process.env.JAWSDB_MARIADB_URL || DB_CONFIG);

export default pool;
