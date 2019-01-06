/**
 * RouterGroup - Auth
 *
 * entrypoint: /auth
 */

const fs = require("fs");
const router = require('express').Router();

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

    res.send(req.get("username"));
});

//模块导出
module.exports = router;