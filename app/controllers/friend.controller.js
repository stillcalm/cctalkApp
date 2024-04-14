const Friend = require("../models/friend.model");
const User = require("../models/user.model");
const Chats = require("../models/chats.model");
const { v4: uuid_v4 } = require("uuid");

exports.addFriend = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  try {
    const data = await User.findByUsername(req.body.friendName);
    if (!data) {
      return res.status(200).send({
        status: 200,
        message: "Friend not found!",
      });
    }

    if (req.body.uuid && data.uuid) {
      const chat_uuid = await Chats.addChatsByUUID(uuid_v4());
      if (!chat_uuid) {
        return res.status(500).send({
          status: 500,
          message: "Failed to add chat UUID!",
        });
      }
      await Friend.addFriendByUUID(req.body.uuid, data.uuid, chat_uuid);

      return res.send({
        status: 200,
        message: "Friend was added successfully!",
      });
    } else {
      return res.status(400).send({
        status: 400,
        message: "UUID is required!",
      });
    }
  } catch (err) {
    console.error("Error adding friend:", err);
    return res.status(500).send({
      status: 500,
      message: "Error adding friend",
      error: err.message || "Internal Server Error",
    });
  }
};

exports.getFriends = (req, res) => {
  Friend.getFriendsByUUID(req.query.uuid, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: "Error retrieving friend with id " + req.params.uuid,
      });
    }
    const friendsList = [];
    data.forEach((friendReLation) => {
      if (friendReLation.user1_uuid === req.query.uuid) {
        friendsList.push(friendReLation.user2_uuid);
      } else {
        friendsList.push(friendReLation.user1_uuid);
      }
    });
    User.findByUUIds(friendsList, (err, data_) => {
      if (err) {
        return res.status(500).send({
          message: "Error retrieving friend with id " + req.params.uuid,
        });
      }
      return res.send({
        status: 200,
        message: "Friends were retrieved successfully!",
        data: {
          friendsList: data_,
        },
      });
    });
  });
};
