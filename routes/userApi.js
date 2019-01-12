/**
 * RouterGroup - Probe
 *
 * entrypoint: /user/api
 */

const fs = require("fs");
const router = require('express').Router();
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


/**
 * 主路由组
 */

// 仪表盘
router.get("/userInfo",function (req,res) {
    res.header("Content-Type","text/json");

    // 用户名 + 判断是否存在
    let username = req.query.username;
    if (username === undefined || username === ""){
        res.send("{status: -100,username: '" + username + "',message: 'Can not find this user'}");
        return false;
    }

    // 判断文件
    let file_path = "./users/" + username + ".json";
    let file_exist = fs.existsSync(file_path);

    if (file_exist === false){
        res.send("{status: -100,username: '" + username + "',path: '" + file_path + "',message: 'Can not find this user file'}");
        return false;
    }

    // 获取文件内容 + 发送
    res.send(fs.readFileSync(file_path));
});



//模块导出
module.exports = router;