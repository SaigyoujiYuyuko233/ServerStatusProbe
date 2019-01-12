/**
 * ----------- 无计算机语言基础者请阅读 -----------
 *
 * 文本值，双引号之间是文本描述（字符串），类似于 "UTF-8" ，"Hello" 等等
 * 真假值, true 代表准许 false 代表禁止
 * 数字值，直接书写即可 列如 1,2,3,5.565,20000,5555,
 * 注释，纯属用来看的，毫无作用 // 代表单行注释
 *
 * 请放心，这不是要你书写计算机语言，而是进行十分简单的编辑；
 * 当然你可以选择不改动此文件。
 *
 *
 * 如果您修改了设置请重启监控面板！！
 */

/*------------------ 配置开始------------------ */

/************************************************
 *             Web Server Config                *
 *                                              *
 *           ==== http服务器的设置 ====           *
 ************************************************
 */

/*
 * The port that the httpServer listening
 * http服务器的端口
 */

Setting.Http_server_port = 2333;

/*
 * The ip that the httpServer listening
 * http服务器监听的ip
 */

Setting.Http_server_ip = "0.0.0.0";


/************************************************
 *             Probe Config                     *
 *                                              *
 *         ==== SSProbe的设置 ====               *
 ************************************************
 */

/*
 * The frequency of the data update[ms]
 * 探针数据更新速度[ms]
 */

Setting.Data_update_time = 500;

/*
 * The token that you login keep time[hour]
 * 您登录的令牌保持时间[小时]
 */

Setting.token_remember_time = 4;
