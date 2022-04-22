import { DB_CONFIG } from '../config.js';
import mariadb from "mariadb";

let createPoolWith = {};
if (process.env.JAWSDB_MARIA_URL) {
  createPoolWith = {
    host: "klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "oshn0n1uh3v3ai0t",
  };
} else {
  createPoolWith = DB_CONFIG;
}

const pool = mariadb.createPool(createPoolWith);

export default pool;
