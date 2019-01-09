/**
 * RouterGroup - Auth
 *
 * entrypoint: /auth
 */

const fs = require("fs");
const router = require('express').Router();
const session = require('express-session');
const postParser = require('body-parser');

// post解析中间件
router.use(postParser.urlencoded({ extended:false }));

// 登录验证界面
router.get("/",function (req, res) {
    //设置头
    res.header("Content-Type","text/html");

    let auth_page =  fs.readFileSync("./public/auth.html");
    res.send(auth_page);
});


// post到登录界面
router.post("/login",function (req, res) {
    //设置头
    res.header("Content-Type","text/html");

    // 设置变量
    let username = req.body.username;
    let password = req.body.password;

    // 判断用户名是否正确
    fs.stat("./users/" + username + ".json",function (err,stats) {
        if(stats == undefined){
            res.redirect("/auth/?message=此用户不存在!");
        }
    });
    
    
});

//模块导出
module.exports = router;
