/**
 * RouterGroup - Probe
 *
 * entrypoint: /user/api
 */

const fs = require("fs");
const router = require('express').Router();
const path = require('path');
const os = require('os');


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
    let file_path = path.join(__dirname + "/../users/" + username + ".json");
    let file_exist = fs.existsSync(file_path);

    if (file_exist === false){
        res.send("{status: -100,username: '" + username + "',path: '" + file_path + "',message: 'Can not find this user file'}");
        return false;
    }

    // 获取文件内容 + 发送
    res.sendFile(file_path);
});

// 系统信息
router.get("/systemInfo",function (req,res) {
    // 开机时间
    system_info.up_time = os.uptime();

    res.send(JSON.stringify(system_info));
});



//模块导出
module.exports = router;