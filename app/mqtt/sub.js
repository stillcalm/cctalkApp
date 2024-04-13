const mqtt = require("mqtt");

const info = { uuid: "57774bf8-bb17-4519-b9d5-becbbf61c25a", password: "123456" };

const client = mqtt.connect("mqtt://127.0.0.1:1883", {
  uuid: info.uuid,
  password: info.password,
});

client.on("connect", function () {
  console.log("服务器连接成功", info.uuid);
  console.log(client.options.clientId);
  client.subscribe("text", { qos: 1 }); // 订阅text消息
});

client.on("message", function (top, message) {
  console.log("当前topic:", top);
  console.log(message.toString());
});

client.on("error", function (error) {
  console.log(error);
});

client.on("disconnect", function (packet) {
  console.log('连接断开');
});
