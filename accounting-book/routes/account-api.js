var express = require('express');
var router = express.Router();

//导入 lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname + '/../data/db.json');
const db = low(adapter);
const moment = require('moment');
const accountModel = require('../models/accountModel');



router.get('/account', async function(req, res, next) {
    try {
        const accounts = await accountModel.find().sort({time: -1});
        // res.render('list', { accounts: accounts,moment: moment });
        res.json({
            code:'0000',
            msg:'读取成功',
            data: accounts
        });
    } catch (err) {
        // 判断是否有错误
        res.json({
            code:'0001',
            msg:'读取失败',
            data: null
        });
    }
});

router.post('/account', async (req, res) => {
    try {
        const newAccount = await accountModel.create({
            ...req.body,
            //修改 time 属性的值
            time: moment(req.body.time).toDate()
        });
        res.json({
            code:'0000',
            msg:'创建成功',
            data: newAccount
        });
    } catch (err) {
        // 判断是否有错误
        res.json({
            code:'1002',
            msg:'创建失败',
            data: null
        });
    }
});

router.delete('/account/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await accountModel.deleteOne({_id: id});
        res.json({
            code:'0000',
            msg:'删除成功',
            data: null
        });
    } catch (err) {
        res.json({
            code:'1003',
            msg:'删除失败',
            data: null
        });
    }
});

router.get('/account/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const account = await accountModel.findById(id);
        res.json({
            code:'0000',
            msg:'查询成功',
            data: account
        });
    } catch (err) {
        res.json({
            code:'1004',
            msg:'查询失败',
            data: null
        });
    }
});
module.exports = router;
