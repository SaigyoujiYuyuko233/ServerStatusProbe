/**
 * 获得系统信息
 */

const os = require('os');

global.system_info = {};

// 系统架构
system_info.system_architecture = os.arch();

// cpu信息
system_info.cpu_info = os.cpus();

// 用户根目录
system_info.user_root = os.homedir();

// 操作系统类型
system_info.system_type = os.type();

// 开机时间
system_info.up_time = os.uptime();

// 内存总量
system_info.ram_vol = os.totalmem();