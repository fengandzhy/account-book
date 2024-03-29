var express = require('express');
var router = express.Router();

//导入 lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname + '/../data/db.json');
const db = low(adapter);

//导入 shortid
const shortid = require('shortid');

/* accounting book list page. */
router.get('/account', function(req, res, next) {
  const accounts = db.get('accounts').value();
  res.render('list', { accounts: accounts });

});

router.get('/account/create', function(req, res, next) {
  res.render('create');
});

router.post('/account', (req, res) => {
  const id = shortid.generate();
  db.get('accounts').unshift({id:id,...req.body}).write();
  res.render('success',{ msg: '添加成功', url: '/account' });
});

module.exports = router;
