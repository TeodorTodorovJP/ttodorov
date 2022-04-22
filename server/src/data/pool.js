import { DB_CONFIG } from '../config.js';
import mariadb from 'mariadb';
console.log("## JAWSDB_MARIADB_URL ## " + process.env.JAWSDB_MARIADB_URL)
const pool = mariadb.createPool(process.env.JAWSDB_MARIADB_URL || DB_CONFIG);

export default pool;
