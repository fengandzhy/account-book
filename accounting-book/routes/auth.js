var express = require('express');
var router = express.Router();
//导入 用户的模型
const userModel = require('../models/userModel');
const md5 = require('md5');
const accountModel = require("../models/accountModel");
const moment = require("moment/moment");
//注册
router.get('/reg', (req, res) => {
    //响应 HTML 内容
    res.render('reg',  {msg: '注册', url: '/reg'});
});

//注册用户
router.post('/reg', async (req, res) => {
    //做表单验证
    try {
        const newUser = await userModel.create({
            ...req.body,
            //修改 time 属性的值
            password: md5(req.body.password)
        });
        res.render('success', {msg: '添加成功', url: '/account'});
    } catch (err) {
        // 判断是否有错误
        res.status(500).send('添加失败!');
    }

});


//登录页面
router.get('/login', (req, res) => {
    //响应 HTML 内容
    res.render('reg',{msg: '登录', url: '/login'});
});
//
// //登录操作
router.post('/login', async (req, res) => {
    //获取用户名和密码
    const {username, password} = req.body;
    try {
        const user = await userModel.findOne({username: username, password: md5(password)});
        if(!user){
            return res.send('账号或密码错误~~');
        }
        //写入session
        req.session.username = user.username;
        req.session._id = user._id;
        //登录成功响应
        res.render('success', {msg: '登录成功', url: '/account'});
    } catch (err) {
        console.log(err);
        // 判断是否有错误
        return res.status(500).send('登录, 请稍后再试~~');
    }

});

//退出登录
router.post('/logout', (req, res) => {
    //销毁 session
    req.session.destroy(() => {
        res.render('success', {msg: '退出成功', url: '/login'});
    })
});

module.exports = router;
