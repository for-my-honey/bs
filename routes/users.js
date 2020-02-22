var express = require('express');
// var connection = require('./db/connect');

// var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '918912',
  database: 'musicsys'
});

connection.connect()
  /* GET users listing. */
router.get('/user', function(req, res, next) {
  var userquery = "select * from userinfo";
  connection.query(userquery, function(err, result) {
      if (err) {
        console.log('[login ERROR] - ', err.message);
        return;
      }
      res.end(JSON.stringify(result));
    })
    // res.send('respond with a resource');
    // console.log(result);
});
router.get('/user/updateStatus', function(req, res, next) {
  let response = {
    "usernum": req.query.usernum,
    "TF": req.query.TF,
  };
  let updateStatus = "update userinfo set TF = '" + response.TF + "' where usernum = '" + response.usernum + "'";
  // var updateStatus = "select username,password from userlogin where username = '" + response.username + "' and password = '" + response.password + "'";
  // let modSqlParams = ['Tom', 'tom@qq.com', 7];
  connection.query(updateStatus, function(err, result) {
      if (err) {
        console.log('[login ERROR] - ', err.message);
        return;
      }
      res.end(JSON.stringify(result));
    })
    // res.send('respond with a resource');
    // console.log(result);
});

module.exports = router;