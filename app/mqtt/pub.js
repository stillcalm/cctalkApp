const mqtt = require("mqtt");

const client  = mqtt.connect('mqtt://127.0.0.1:1883',{
  username: "user",
  password: '123456'
});

client.on("connect", function() {
  console.log("服务器连接成功");
  console.log(client.options.clientId);
  client.publish("text", JSON.stringify({id: 1}), { qos: 0, retain: true }); // 发布主题text消息
});

client.on('error', function (error) {
  console.log(error)
})

client.on('disconnect', function (packet) {
  console.log(packet)
})
