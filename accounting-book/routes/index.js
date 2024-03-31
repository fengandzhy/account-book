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
router.get('/account', async function(req, res, next) {
  try {
    const accounts = await accountModel.find().sort({time: -1});
    res.render('list', { accounts: accounts,moment: moment });
  } catch (err) {
    // 判断是否有错误
    res.status(500).send('查询失败!');
    return;
  }
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
    res.status(500).send('插入失败!');
    return;
  }
});

router.get('/account/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await accountModel.deleteOne({_id: id});
    res.render('success',{ msg: '删除成功', url: '/account' });
  } catch (err) {

    console.log(err);
    res.status(500).send('删除失败!');
    return;
  }
});

module.exports = router;
