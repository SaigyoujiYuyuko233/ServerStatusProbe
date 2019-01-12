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

router.get("/",function (req,res) {
    res.send("You are login! So this is the main page of the SSProbe!");
});



//模块导出
module.exports = router;