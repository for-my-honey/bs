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
router.get('/dashboard/usernum', function(req, res, next) {
  var usernum = "select count(case when age BETWEEN 0 AND 12 THEN 1 END) as one,count(case when age BETWEEN 13 AND 18 THEN 2 END) as two,count(case when age BETWEEN 19 AND 29 THEN 3 END) as three,count(case when age BETWEEN 30 AND 45 THEN 4 END) as four,count(case when age > 45 THEN 3 END) as five FROM userinfo";
  connection.query(usernum, function(err, result) {
    if (err) {
      console.log('[login ERROR] - ', err.message);
      return;
    }
    console.log(result[0]);

    res.end(JSON.stringify(result[0]));
  })
});
router.get('/dashboard/usersex', function(req, res, next) {
  var usersex = "select count(case when sex = '男' THEN 1 END) as one,count(case when sex = '女' THEN 2 END) as two FROM userinfo";
  connection.query(usersex, function(err, result) {
    if (err) {
      console.log('[login ERROR] - ', err.message);
      return;
    }
    console.log(result[0]);

    res.end(JSON.stringify(result[0]));
  })
});
router.get('/dashboard/songtype', function(req, res, next) {
  var songtype = "select count(case when songtype='流行' THEN 1 END) as liuxing,count(case when songtype='民谣' THEN 2 END) as myao,count(case when songtype='古典' THEN 3 END) as gudian,count(case when songtype='摇滚' THEN 4 END) as yaogun,count(case when songtype='嘻哈' THEN 3 END) as xiha FROM songinfo";
  connection.query(songtype, function(err, result) {
    if (err) {
      console.log('[login ERROR] - ', err.message);
      return;
    }
    console.log(result);

    res.end(JSON.stringify(result));
  })
});
router.get('/dashboard/songarea', function(req, res, next) {
  var songarea = "select count(case when songarea='内地' THEN 1 END) as neidi,count(case when songarea='港台' THEN 2 END) as gangtai,count(case when songarea='韩国' THEN 3 END) as hanguo,count(case when songarea='欧美' THEN 4 END) as omei,count(case when songarea='日本' THEN 5 END) as xriben FROM songinfo";
  connection.query(songarea, function(err, result) {
    if (err) {
      console.log('[login ERROR] - ', err.message);
      return;
    }
    console.log(result);

    res.end(JSON.stringify(result));
  })
});
router.get('/dashboard/malesinger', function(req, res, next) {
  var malesinger = "select count(case when singerarea='内地' and singersex='男' THEN 1 END) as neidi,count(case when singerarea='港台' and singersex='男' THEN 2 END) as gangtai,count(case when singerarea='韩国' and singersex='男' THEN 3 END) as hanguo,count(case when singerarea='欧美' and singersex='男' THEN 4 END) as omei,count(case when singerarea='日本' and singersex='男' THEN 5 END) as xriben FROM singerinfo";
  connection.query(malesinger, function(err, result) {
    if (err) {
      console.log('[login ERROR] - ', err.message);
      return;
    }
    console.log(result);

    res.end(JSON.stringify(result));
  })
});
router.get('/dashboard/femalesinger', function(req, res, next) {
  var femalesinger = "select count(case when singerarea='内地' and singersex='女' THEN 1 END) as neidi,count(case when singerarea='港台' and singersex='女' THEN 2 END) as gangtai,count(case when singerarea='韩国' and singersex='女' THEN 3 END) as hanguo,count(case when singerarea='欧美' and singersex='女' THEN 4 END) as omei,count(case when singerarea='日本' and singersex='女' THEN 5 END) as xriben FROM singerinfo";
  connection.query(femalesinger, function(err, result) {
    if (err) {
      console.log('[login ERROR] - ', err.message);
      return;
    }
    console.log(result);

    res.end(JSON.stringify(result));
  })
});
router.get('/dashboard/singernum', function(req, res, next) {
  var singernum = "select count(case when singerarea='内地' THEN 1 END) as neidi,count(case when singerarea='港台' THEN 2 END) as gangtai,count(case when singerarea='韩国' THEN 3 END) as hanguo,count(case when singerarea='欧美' THEN 4 END) as omei,count(case when singerarea='日本' THEN 5 END) as xriben FROM singerinfo";
  connection.query(singernum, function(err, result) {
    if (err) {
      console.log('[login ERROR] - ', err.message);
      return;
    }
    console.log(result);

    res.end(JSON.stringify(result));
  })
});
module.exports = router;