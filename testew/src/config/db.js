const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // substitua pelo seu usuário do MySQL
  password: 'password', // substitua pela sua senha do MySQL
  database: 'todo_app'
});

module.exports = pool.promise();
