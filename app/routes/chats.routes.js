const express = require("express");
const router = express.Router();
const chats = require("../controllers/chats.controller");

router.get("/getChatsByChatUuids", chats.getChatsByChatUuid);

module.exports = router;
