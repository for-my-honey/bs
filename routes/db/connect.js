var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '918912',
  database: 'musicsys'
});
module.exports = connection;