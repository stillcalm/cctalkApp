const aedes = require('aedes')();
const mqttServer = require('net').createServer(aedes.handle);

// 身份验证
aedes.authenticate = function (_client, username, password, callback) {
    // with no error, successful be true
    // callback(error, successful)
    // 这里可以进行用户名和密码的验证
    callback(null, (username === 'user' && password.toString() === '123456'));
}

// 客户端连接
// 触发回调，修改在线状态
aedes.on('client', function (client) {
    console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + 
    '\x1b[0m', 'to broker', aedes.id);
});

// 客户端断开
aedes.on('clientDisconnect', function (client) {
    console.log('Client Disconnected: \x1b[31m' + (client ? client.id : client) + 
    '\x1b[0m', 'to broker', aedes.id);
});

module.exports = mqttServer;
