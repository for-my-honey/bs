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
router.get('/download', function(req, res, next) {
  var q = req.query.songurl;
  // console.log('../public/mp3/' + q);
  // res.send('dadad')
  res.download(`public/mp3/${q}`);
});
module.exports = router;