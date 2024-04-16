const express = require("express");
const router = express.Router();
const chats = require("../controllers/chats.controller");

router.get("/getChatsByChatUuids", chats.getChatsByChatUuid);

router.get("/getHistoryMesByChatUuid", chats.getHistoryMesByChatUuid);

router.post("/sendMessage", chats.storeMessage);

module.exports = router;
