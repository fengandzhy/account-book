var express = require('express');
var router = express.Router();

//导入 lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname + '/../data/db.json');
const db = low(adapter);
const moment = require('moment');
const accountModel = require('../models/accountModel');


/* accounting book list page. */
router.get('/account', function(req, res, next) {
  const accounts = db.get('accounts').value();
  res.render('list', { accounts: accounts });

});

router.get('/account/create', function(req, res, next) {
  res.render('create');
});

// 插入数据
router.post('/account', async (req, res) => {
  try {
  const newAccount = await accountModel.create({
    ...req.body,
    //修改 time 属性的值
    time: moment(req.body.time).toDate()
  });
  res.render('success', {msg: '添加成功', url: '/account'});
  } catch (err) {
    // 判断是否有错误
    console.log(err);
  }
});

router.get('/account/:id', (req, res) => {
  const id = req.params.id;
  db.get('accounts').remove({id:id}).write();
  res.render('success',{ msg: '删除成功', url: '/account' });
});

module.exports = router;
