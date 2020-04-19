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
router.get('/song', function(req, res, next) {
  var userquery = "select * from songinfo";
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

router.get('/song/select', (req, res) => {
  var value = req.query.songname;
  connection.query(`SELECT * FROM songinfo where songname like '%${value}%'`, (err, vals) => {
    if (err) {
      console.log('[login ERROR] - ', err.message);
      return;
    }
    let rows = JSON.stringify(vals);
    res.send(rows)
  })
})
router.get('/song/deleat', function(req, res, next) {
  let response = {
    "id": req.query.id,
  };
  let deleat = "DELETE FROM songinfo where id= '" + response.id + "'";
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
router.get('/song/songList', function(req, res, next) {
  let listquery = "select id,songname,songdesc,imgurl from songinfo";
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

router.post('/song/updateSong', function(req, res, next) {
  let response = {
    "id": req.body.id,
    "songname": req.body.songname,
    "songcd": req.body.songcd,
    "songtype": req.body.songtype,
    "singer": req.body.singer,
    "songarea": req.body.songarea,
    "songdate": req.body.songdate,
  };
  let updateSong = "update songinfo set songname = '" + response.songname +
    "',songcd = '" + response.songcd +
    "',songtype = '" + response.songtype +
    "',singer = '" + response.singer +
    "',songarea = '" + response.songarea +
    "',songdate = '" + response.songdate +
    "' where id = '" + response.id + "'";
  console.log(response);

  // var updateStatus = "select username,password from userlogin where username = '" + response.username + "' and password = '" + response.password + "'";
  // let modSqlParams = ['Tom', 'tom@qq.com', 7];
  connection.query(updateSong, function(err, result) {
      if (err) {
        console.log('[login ERROR] - ', err.message);
        return;
      }
      res.end(JSON.stringify(result));
    })
    // res.send('respond with a resource');
    // console.log(result);
});
router.post('/song/updatelist', function(req, res, next) {
  let response = {
    "id": req.body.id,
    "songdesc": req.body.songdesc,
    "upload": req.body.upload,
  };
  let updatelist;
  if (response.upload == 'null') {
    updatelist = "update songinfo set songdesc = '" + response.songdesc +
      "',imgurl = " + null +
      " where id = '" + response.id + "'";
  } else {
    updatelist = "update songinfo set songdesc = '" + response.songdesc +
      "',imgurl = '" + response.upload +
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

router.post('/song/addSong', function(req, res, next) {
  let response = {
    "songurl": req.body.songurl,
    "songname": req.body.songname,
    "songcd": req.body.songcd,
    "songtype": req.body.songtype,
    "singer": req.body.singer,
    "songarea": req.body.songarea,
    "songdate": req.body.songdate,
  };
  let addSong = "insert into songinfo (`songname`, `songtype`, `singer`, `songarea`, `songdate`, `songurl`, `songcd`) values ('" + response.songname +
    "','" + response.songtype +
    "','" + response.singer +
    "','" + response.songarea +
    "','" + response.songdate +
    "','" + response.songurl +
    "','" + response.songcd + "')";
  console.log(response);

  // var updateStatus = "select username,password from userlogin where username = '" + response.username + "' and password = '" + response.password + "'";
  // let modSqlParams = ['Tom', 'tom@qq.com', 7];
  connection.query(addSong, function(err, result) {
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