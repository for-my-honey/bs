var express = require('express');
// var connection = require('./db/connect');
// var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '918912',
  database: 'musicsys'
});

connection.connect()
router.get('/singer', function(req, res, next) {
  var userquery = "select * from singerinfo";
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

router.get('/singer/select', (req, res) => {
  var value = req.query.singername;
  connection.query(`SELECT * FROM singerinfo where singername like '%${value}%'`, (err, vals) => {
    if (err) {
      console.log('[login ERROR] - ', err.message);
      return;
    }
    let rows = JSON.stringify(vals);
    res.send(rows)
  })
})
router.get('/singer/selectArea', (req, res) => {
  var value = req.query.singerarea;
  connection.query(`SELECT * FROM singerinfo where singerarea = '${value}'`, (err, vals) => {
    if (err) {
      console.log('[login ERROR] - ', err.message);
      return;
    }
    let rows = JSON.stringify(vals);
    res.send(rows)
  })
})
router.get('/singer/deleat', function(req, res, next) {
  let response = {
    "id": req.query.id,
  };
  let deleat = "DELETE FROM singerinfo where id= '" + response.id + "'";
  // var updateStatus = "select username,password from userlogin where username = '" + response.username + "' and password = '" + response.password + "'";
  // let modSqlParams = ['Tom', 'tom@qq.com', 7];
  connection.query(deleat, function(err, result) {
      if (err) {
        console.log('[login ERROR] - ', err.message);
        return;
      }
      res.end(JSON.stringify(result));
    })
    // res.send('respond with a resource');
    // console.log(result);
});
router.get('/singer/singerList', function(req, res, next) {
  let listquery = "select id,singername,singersongnum,singercdnum,singerurl from singerinfo";
  // var updateStatus = "select username,password from userlogin where username = '" + response.username + "' and password = '" + response.password + "'";
  // let modSqlParams = ['Tom', 'tom@qq.com', 7];
  connection.query(listquery, function(err, result) {
      if (err) {
        console.log('[login ERROR] - ', err.message);
        return;
      }
      res.end(JSON.stringify(result));
    })
    // res.send('respond with a resource');
    // console.log(result);
});

router.post('/singer/updatesinger', function(req, res, next) {
  let response = {
    "id": req.body.id,
    "singersex": req.body.singersex,
    "singername": req.body.singername,
    "singerdesc": req.body.singerdesc,
    "singerarea": req.body.singerarea,
    "singerday": req.body.singerday,
    "singersymbol": req.body.singersymbol,
  };
  let updatesinger = "update singerinfo set singername = '" + response.singername +
    "',singersex = '" + response.singersex +
    "',singerdesc = '" + response.singerdesc +
    "',singersymbol = '" + response.singersymbol +
    "',singerarea = '" + response.singerarea +
    "',singerday = '" + response.singerday +
    "' where id = '" + response.id + "'";
  console.log(response);

  // var updateStatus = "select username,password from userlogin where username = '" + response.username + "' and password = '" + response.password + "'";
  // let modSqlParams = ['Tom', 'tom@qq.com', 7];
  connection.query(updatesinger, function(err, result) {
      if (err) {
        console.log('[login ERROR] - ', err.message);
        return;
      }
      res.end(JSON.stringify(result));
    })
    // res.send('respond with a resource');
    // console.log(result);
});
router.post('/singer/updatelist', function(req, res, next) {
  let response = {
    "id": req.body.id,
    "singersongnum": req.body.singersongnum,
    "singercdnum": req.body.singercdnum,
    "upload": req.body.upload,
  };
  let updatelist;
  if (response.upload == 'null') {
    updatelist = "update singerinfo set singersongnum = '" + response.singersongnum +
      "',singercdnum = '" + response.singercdnum +
      "',singerurl = " + null +
      " where id = '" + response.id + "'";
  } else {
    updatelist = "update singerinfo set singersongnum = '" + response.singersongnum +
      "',singercdnum = '" + response.singercdnum +
      "',singerurl = '" + response.upload +
      "' where id = '" + response.id + "'";
  }
  console.log(response);

  // var updateStatus = "select username,password from userlogin where username = '" + response.username + "' and password = '" + response.password + "'";
  // let modSqlParams = ['Tom', 'tom@qq.com', 7];
  connection.query(updatelist, function(err, result) {
      if (err) {
        console.log('[login ERROR] - ', err.message);
        return;
      }
      res.end(JSON.stringify(result));
    })
    // res.send('respond with a resource');
    // console.log(result);
});

router.post('/singer/addsinger', function(req, res, next) {
  let response = {
    "singersex": req.body.singersex,
    "singername": req.body.singername,
    "singerdesc": req.body.singerdesc,
    "singerarea": req.body.singerarea,
    "singerday": req.body.singerday,
    "singersymbol": req.body.singersymbol,
  };
  let addsinger = "insert into singerinfo (`singername`, `singersex`, `singerday`, `singersymbol`, `singerarea`, `singerdesc`) values ('" + response.singername +
    "','" + response.singersex +
    "','" + response.singerday +
    "','" + response.singersymbol +
    "','" + response.singerarea +
    "','" + response.singerdesc + "')";
  console.log(response);

  // var updateStatus = "select username,password from userlogin where username = '" + response.username + "' and password = '" + response.password + "'";
  // let modSqlParams = ['Tom', 'tom@qq.com', 7];
  connection.query(addsinger, function(err, result) {
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