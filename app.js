//输出logo
console.log("----------------------------------------------------------------------");
console.log(" ____ ____  ____            _          \n" +
    "/ ___/ ___||  _ \\ _ __ ___ | |__   ___ \n" +
    "\\___ \\___ \\| |_) | '__/ _ \\| '_ \\ / _ \\\n" +
    " ___) |__) |  __/| | | (_) | |_) |  __/\n" +
    "|____/____/|_|   |_|  \\___/|_.__/ \\___|\n" +
    "                                      ");
console.log("+ V1.0.0");
console.log('+ Copyright 2019 SaigyoujiYuyuko[3558168775] All rights reserved.');
console.log("----------------------------------------------------------------------");


/**
 * 全局变量
 */

// 设置数组
global.Setting = {};

// 时间类
global.localtime = new Date();

// 启动时间
global.start_time = localtime.getTime();

// 已登录的用户
global.sessions = [];

/**
 * 模块的导入
 */

// Http模块
const express = require('express');
const cookie_parser = require('cookie-parser');
const postParser = require('body-parser');
const http = require('http');
const app = express();

const fs = require("fs");
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
 * 导入js文件
 */

// 设置文件
require("./setting.js");
console.log("[ " + "Config".green + " ] " + "配置文件 [Setting.js] 已加载!".gray);


/**
 *===========创建web服务器===========
 */

/**
 * 中间件
 */

// 导入中间件
let middleware_global = require("./routes/middleware/middleware_global");
let middleware_auth = require("./routes/middleware/middleware_auth");

// 注册中间件
app.all("/*",middleware_global);
app.use("*",cookie_parser());
app.use("*",postParser.urlencoded({ extended:false }));
app.use("/probe*",middleware_auth);
app.use("/user/api*",middleware_auth);

console.log("[ " + "MiddleWare".green + " ] " + "中间件 [cookie_parser] 已加载并注册!".gray);
console.log("[ " + "MiddleWare".green + " ] " + "中间件 [postParser] 已加载并注册!".gray);
console.log("[ " + "MiddleWare".green + " ] " + "中间件 [middleware_global.js] 已加载并注册!".gray);
console.log("[ " + "MiddleWare".green + " ] " + "中间件 [middleware_auth.js] 已加载并注册!".gray);


/**
 * 路由组
 */

// 导入路由组文件
const router_auth = require("./routes/auth");
const router_probe = require("./routes/probe");
const user_api = require("./routes/userApi");

// 注册路由组
app.use("/auth",router_auth);
app.use("/probe",router_probe);
app.use("/user/api",user_api);

console.log("[ " + "RouterGroup".green + " ] " + "路由组 [auth.js] 已加载并注册!".gray);
console.log("[ " + "RouterGroup".green + " ] " + "路由组 [probe.js] 已加载并注册!".gray);
console.log("[ " + "RouterGroup".green + " ] " + "路由组 [userApi.js] 已加载并注册!".gray);


/**
 * 其他设置
 */

// 静态文件目录
app.use(express.static('./public'));

//设置头
http.createServer(function (req,res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
});

// 启动http服务器
http.createServer(app).listen(Setting.Http_server_port,Setting.Http_server_ip);
module.exports = app;

console.log("[ " + "HttpServer".green + " ] " + "Http服务器已启动 [".input + Setting.Http_server_ip + ":" + Setting.Http_server_port + "]".input);
console.log("[" + " Global ".green + "] " + "探针已加载完成! 耗时: ".input + (process.uptime()*1000) + "ms 感谢您使用 SSProbe 服务器探针!".input);

// 如果此次启动是测试
if(process.argv[2] === "--test"){
    console.log("[" + " Test ".debug + "] " + "检测到此次启动是测试! 系统自动退出!".input);
    console.log("[" + " Test ".debug + "] " + "Exiting...".input);
    
    process.exit(0);
}
