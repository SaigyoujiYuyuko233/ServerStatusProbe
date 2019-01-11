/**
 * 一个记录用户访问的中间件
 */

function webLog() {
    return function (req, res, next){
        console.log("[ " + "INFO".green + " ][ " + "HttpServer ".green + (req.method).data + " ] " + req.ip.warn + " " + req.path);
        next();
    }
};

module.exports = webLog();