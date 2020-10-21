require('dotenv').config();

var db = require('knex')({
  client: 'pg' ,
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : 'brain',
    port: process.env.DB_PORT,
    insecureAuth : true
  }
});

module.exports = db;