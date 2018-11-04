var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'db/cnvs.sqlite3')

let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connect ESV');
  }
});

router.get('/', function(req, res, next) {
  const book = req.query['book'];
  const chapterNumber = req.query['chapter'];
  let sql = `select * from chapters where reference_osis=\'${book}.${chapterNumber}\'`;

  db.all(sql, [], (err, rows) => {
    console.log('query done ' + sql);
    chapters = []
    rows.forEach(row => {
      chapters.push(row['content']);
    });

    res.render('biblesearch', {
      'title': 'Bible Search',
      'book': book,
      'chapterNumber': chapterNumber,
      'chapters': chapters});
  });
});

module.exports = router;
