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
  let updateStatus = "update userinfo set TF = '" + response.TF +
    "' where usernum = '" + response.usernum + "'";
  connection.query(updateStatus, function(err, result) {
    if (err) {
      console.log('[login ERROR] - ', err.message);
      return;
    }
    res.end(JSON.stringify(result));
  })
});

router.get('/user/select', (req, res) => {
  var value = req.query.usernum;
  connection.query(`SELECT * FROM userinfo where usernum like '%${value}%'`, (err, vals) => {
    if (err) {
      console.log('[login ERROR] - ', err.message);
      return;
    }
    let rows = JSON.stringify(vals);
    res.send(rows)
  })
})

router.get('/user/deleat', function(req, res, next) {
  let response = {
    "id": req.query.id,
  };
  let deleat = "DELETE FROM userinfo where id= '" + response.id + "'";
  connection.query(deleat, function(err, result) {
    if (err) {
      console.log('[login ERROR] - ', err.message);
      return;
    }
    res.end(JSON.stringify(result));
  })
});
module.exports = router;