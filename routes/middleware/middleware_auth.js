/**
 * 一个判断用户登录状态的中间件
 */

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

function isLogin() {
    return function (req, res, next){
        const console_head = "[ WARN ]".warn + "[ Auth ] ".green + req.ip.warn + " ";

        let auth_token = new Buffer(req.cookies.auth_token, 'base64').toString('utf8');
        let session_token = sessions[auth_token.split("|")[0]];

        // 如果cookie不存在
        if (auth_token === undefined){
            res.redirect("/auth");
            return false;
        }

        // 如果本地没有记录
        if (session_token === undefined){
            console.log(console_head + "找不到用户: ".gray + auth_token.split("|")[0] + " 在本地的session记录!".gray);

            res.cookie("auth_token","qwq",{expires: new Date(Date.now() - 9999),path: "/"});
            res.redirect("/auth");

            return false;
        }

        // 获取信息 - cookie
        let cookie_username = auth_token.split("|")[0];
        let cookie_password = auth_token.split("|")[1];
        let cookie_timestamp = auth_token.split("|")[2];
        let cookie_ip = auth_token.split("|")[3];

        // 获取信息 - 本地sessions
        let session_password = session_token.split("|")[0];
        let session_timestamp = session_token.split("|")[1];
        let session_ip = session_token.split("|")[2];

        // 如果cookie和本地信息不一样
        if (cookie_password !== session_password){
            console.log(console_head + "用户: ".gray + auth_token.split("|")[0] + " 的cookie与本地session不匹配!".gray);

            // 删除本地 + 远程
            sessions.splice(sessions.indexOf(cookie_username),session_token.length);
            res.cookie("auth_token","qwq",{expires: new Date(Date.now() - 9999),path: "/"});

            res.redirect("/auth/?message=身份令牌与服务器不一样!请重新登录!");

            return false;
        }

        if (cookie_timestamp !== session_timestamp){
            console.log(console_head + "用户: ".gray + auth_token.split("|")[0] + " 的cookie与本地session不匹配!".gray);

            // 删除本地 + 远程
            sessions.splice(sessions.indexOf(cookie_username),session_token.length);
            res.cookie("auth_token","qwq",{expires: new Date(Date.now() - 9999),path: "/"});

            res.redirect("/auth/?message=身份令牌信息与服务器不一样!请重新登录!");

            return false;
        }

        if (session_ip !== cookie_ip){
            console.log(console_head + "用户: ".gray + auth_token.split("|")[0] + " 的cookie与本地session不匹配!".gray);

            // 删除本地 + 远程
            sessions.splice(sessions.indexOf(cookie_username),session_token.length);
            res.cookie("auth_token","qwq",{expires: new Date(Date.now() - 9999),path: "/"});

            res.redirect("/auth/?message=身份令牌信息与服务器不一样!请重新登录!");

            return false;
        }

        next();
    }
}

module.exports = isLogin();