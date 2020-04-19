const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const pathLib = require('path');
const app = express();

router.post('/uploadImg', multer({
  //设置文件存储路径
  dest: './public/images' //upload文件如果不存在则会自己创建一个。
}).single('file'), function(req, res, next) {
  if (req.file.length === 0) { //判断一下文件是否存在，也可以在前端代码中进行判断。
    console.log('[login ERROR] - ', err.message);
    return;
  } else {
    let file = req.file;
    let fileInfo = {};
    console.log(file);
    fs.renameSync('./public/images/' + file.filename, './public/images/' + file.originalname); //这里修改文件名字，比较随意。
    // 获取文件信息
    fileInfo.mimetype = file.mimetype;
    fileInfo.originalname = file.originalname;
    fileInfo.size = file.size;
    fileInfo.path = file.path;

    // 设置响应类型及编码
    res.set({
      'content-type': 'application/json; charset=utf-8'
    });

    res.end(JSON.stringify(fileInfo.originalname));
  }
});
module.exports = router;