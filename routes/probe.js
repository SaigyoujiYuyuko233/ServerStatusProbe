/**
 * RouterGroup - Probe
 *
 * entrypoint: /probe
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
router.get("/dashboard",function (req,res) {
    res.header("Content-Type","text/html");
    res.send(fs.readFileSync("./views/probe/dashboard.html"));
});


//模块导出
module.exports = router;