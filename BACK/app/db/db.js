// get the client
const mysql = require('mysql2');
require('dotenv').config()

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  // host: 'localhost',
  host: 'db',
  user: process.env.DB_USERNAME,
  database: 'scrape',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  password:process.env.DB_PASSWORD
});

module.exports=pool.promise()