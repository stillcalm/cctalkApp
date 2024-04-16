const Chats = require("../models/chats.model");
const Message = require("../models/message.model");

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

exports.getHistoryMesByChatUuid = (req, res) => {
  Message.getHistoryMesByChatUuid(req.query.chat_uuid)
    .then((messages) => {
      // 成功获取聊天记录，返回给客户端
      return res.status(200).json({
        status: 200,
        data: {
          messages: messages,
        },
      });
    })
    .catch((error) => {
      console.error("Error fetching messages:", error);
      return res.status(500).json({ error: "Internal server error" });
    });
};

exports.storeMessage = (req, res) => {
  console.log(req.body);
  Message.storeMessage(req.body)
    .then(() => {
      return res.status(200).json({
        status: 200,
        message: "Message stored successfully",
      });
    })
    .catch((error) => {
      console.error("Error storing message:", error);
      return res.status(500).json({ error: "Internal server error" });
    });
};
