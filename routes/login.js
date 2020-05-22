// var connection = require('./db/connect');
var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '918912',
  database: 'musicsys'
});

connection.connect()

/* GET home page. */
router.get('/login', function(req, res, next) {
  var response = {
    "username": req.query.username,
    "password": req.query.password,
  };

  var userselectSQL = "select username from userlogin where username = '" + response.username + "'";
  var selectSQL = "select username,password from userlogin where username = '" + response.username + "' and password = '" + response.password + "'";
  //var selectSQL = "select password from user where account='"+req.query.account+"'";
  var addSqlParams = [req.query.username, req.query.password];
  connection.query(userselectSQL, function(err, result) {
    if (err) {
      console.log('[login ERROR] - ', err.message);
      return;
    }
    //console.log(result);
    if (result == '') {
      console.log("请输入正确的账号");
      res.end(JSON.stringify('0')); //如果登录失败就给客户端返回0，
    } else {
      connection.query(selectSQL, function(err, result) {
        if (err) {
          console.log('[login ERROR] - ', err.message);
          return;
        }
        if (result == '') {
          console.log("密码错误");
          res.end(JSON.stringify('1')); //如果密码错误就给客户端返回1，
        } else {
          res.end(JSON.stringify('2')); //成功返回2
        }
      })
    };
  });
});

module.exports = router;