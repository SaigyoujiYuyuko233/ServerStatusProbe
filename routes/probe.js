/**
 * RouterGroup - Probe
 *
 * entrypoint: /probe
 */

const fs = require("fs");
const router = require('express').Router();
const colors = require("colors");
const path = require('path');

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
router.get("/dashboard",function (req,res) {
    res.header("Content-Type","text/html");
    res.sendFile(path.join(__dirname + "/../public/probe/backstage_framework.html"));
});

// iframe 功能页面
router.get("/backstage/:target",function (req,res) {
    res.header("Content-Type","text/html");
    res.sendFile(path.join(__dirname + "/../public/probe/backstage/" + req.params.target + ".html"));
});


//模块导出
module.exports = router;