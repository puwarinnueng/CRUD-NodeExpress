//routes เอาไว้ เข้าถึงข้อมูล เพิ่มข้อมูล ลบข้อมูล อัปเดตข้อมูล

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/books', function(req, res, next) {
//   res.render('books', { title: 'Express' });
// });

module.exports = router;
