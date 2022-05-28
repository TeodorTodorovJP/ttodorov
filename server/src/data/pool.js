import { DB_CONFIG } from "../config.js";
import mariadb from "mariadb";

// Connection String mysql://oshn0n1uh3v3ai0t:kiu4qzodo6bwp2m3@klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/kpwjo6ti6ysm389o
let createPoolWith = {};
if (process.env.JAWSDB_MARIA_URL) {
  createPoolWith = {
    host: "klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "oshn0n1uh3v3ai0t",
    password: "kiu4qzodo6bwp2m3",
    port: "3306",
    database: "kpwjo6ti6ysm389o",
    connectionLimit: 8,
  };
} else {
  createPoolWith = DB_CONFIG;
}

const pool = mariadb.createPool(createPoolWith);

export default pool;
