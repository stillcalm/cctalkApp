const Chats = require("../models/chats.model");

exports.getChatsByChatUuid = (req, res) => {
  const uuids = req.query.uuids;
  Chats.getChatByUUIDs(uuids)
    .then((chats) => {
      // 成功获取聊天记录，返回给客户端
      return res.status(200).json({
        status: 200,
        data: {
          chats: chats,
        },
      });
    })
    .catch((error) => {
      // 处理错误，返回错误信息给客户端
      console.error("Error fetching chats:", error);
      return res.status(500).json({ error: "Internal server error" });
    });
};


