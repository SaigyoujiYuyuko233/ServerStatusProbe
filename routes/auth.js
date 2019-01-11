/**
 * RouterGroup - Auth
 *
 * entrypoint: /auth
 */

const fs = require("fs");
const md5 = require("md5");
const router = require('express').Router();
const session = require('express-session');
const postParser = require('body-parser');
const colors = require("colors");

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'red',
    info: 'green',
    data: 'blue',
    help: 'cyan',
    warn: 'yellow',
    debug: 'magenta',
    error: 'red'
});

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
    if (user_password === md5(password_input)){
        sessions[username_input] = user_password + "|" + Date.now();

        console.log("[ " + "INFO".green + " ][ " + "Auth".green + " ] " + req.ip.yellow + " 用户: ".gray + username_input + " 登陆成功!".gray);
        res.send("You login successfully!");
    }else{
        console.log("[ " + "WARN".warn + " ][ " + "Auth".green + " ] " + req.ip.warn + " 用户: ".gray + username_input + " 登陆失败! 使用秘钥: ".gray + password_input);

        res.redirect("/auth/?message=密码错误!");
        return false;
    }

});

//模块导出
module.exports = router;
