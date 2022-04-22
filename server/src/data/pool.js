import { DB_CONFIG } from '../config.js';
import mariadb from 'mariadb';
console.log("## JAWSDB_MARIADB_URL ## " + process.env.JAWSDB_MARIA_URL);

console.log("## process env ## " + JSON.stringify(process.env));


const pool = mariadb.createPool(process.env.JAWSDB_MARIA_URL || DB_CONFIG);

export default pool;
