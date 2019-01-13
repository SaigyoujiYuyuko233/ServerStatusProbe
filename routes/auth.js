/**
 * RouterGroup - Auth
 *
 * entrypoint: /auth
 */

const fs = require("fs");
const md5 = require("md5");
const router = require('express').Router();
const colors = require("colors");
const path = require('path');

// 登录验证界面
router.get("/",function (req, res) {
    //设置头
    res.header("Content-Type","text/html");

    // 判断登录状态
    if (req.cookies.auth_token !== undefined){
        res.redirect("/probe/dashboard");
        return true;
    }

    // 视图
    res.sendFile(path.join(__dirname,"/../public/auth/auth.html"));
});


// post到登录界面
router.post("/login",function (req, res) {

    //设置头
    res.header("Content-Type","text/html");

    // 设置变量
    let username_input = req.body.username;
    let password_input = req.body.password;

    // 判断用户名是否正确
    let userFile_exist =  fs.existsSync("./users/" + username_input + ".json");

    if (userFile_exist === false){
        console.log("[ " + "WARN".warn + " ][ " + "Auth".green + " ] " + req.ip.warn + " 使用不存在的用户: ".gray + username_input + " 进行登录!".gray);

        res.redirect("/auth/?message=此用户不存在!");
        return false;
    }

    // 获取用户信息
    let user_json = fs.readFileSync("./users/" + username_input + ".json");

    // 解析json
    let json = JSON.parse(user_json);

    // 获取密码
    let user_password = json.password;

    // 判断密码是否正确
    if (user_password !== md5(password_input)){
        console.log("[ " + "WARN".warn + " ][ " + "Auth".green + " ] " + req.ip.warn + " 用户: ".gray + username_input + " 登陆失败! 使用秘钥: ".gray + password_input);

        res.redirect("/auth/?message=密码错误!");
        return false;
    }

    // session记录
    sessions[username_input] = user_password + "|" + Date.now() + "|" + req.ip;

    // set cookie
    res.cookie("auth_token",
        new Buffer(username_input + "|" + user_password + "|" + Date.now() + "|" + req.ip).toString("base64"),

        {
        expires: new Date(Date.now() + 1000*60*60*Setting.token_remember_time),
        httpOnly: false,
        path: "/"
    });

    console.log("[ " + "INFO".green + " ][ " + "Auth".green + " ] " + req.ip.yellow + " 用户: ".gray + username_input + " 登陆成功!".gray);
    res.redirect("/probe/dashboard");

});

//模块导出
module.exports = router;
