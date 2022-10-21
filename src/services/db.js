// const mysql = require('mysql');
require('dotenv').config()

// const conn = mysql.createConnection({
//   host     : process.env.DATABASE_HOST,
//   user     : process.env.DATABASE_USER,
//   password : process.env.DATABASE_PASSWORD,
//   database : process.env.DATABASE_DB
// });

// conn.connect();

// module.exports = conn;

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.DATABASE_HOST,
    port : 3306,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_DB,
  }
});

module.exports = knex