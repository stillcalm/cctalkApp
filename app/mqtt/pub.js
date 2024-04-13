const mqtt = require("mqtt");

const info = { uuid: "57774bf8-bb17-4519-b9d5-becbbf61c25a", password: "123456" };

const client = mqtt.connect("mqtt://127.0.0.1:1883", {
  uuid: info.uuid,
  password: info.password,
});

client.on("connect", function () {
  console.log("服务器连接成功");
  console.log(client.options.clientId);
  client.publish(
    "text",
    JSON.stringify({ id: 1 }),
    { qos: 2, retain: false },
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  ); // 发布主题text消息
});

client.on("error", function (error) {
  console.log(error);
});

client.on("disconnect", function (packet) {
  console.log(packet);
});
