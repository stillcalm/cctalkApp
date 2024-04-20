const User = require("../models/user.model");
const Token = require("../models/token.model");
const mySecret = require("../config/config").SECRET;
const jwt = require("jsonwebtoken");

// Create and Save a new User
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }
  const user = new User(
    req.body.username,
    req.body.password_hash,
    req.body.email
  );
  User.create(user)
    .then((data) => {
      return res.status(200).send({
        status: 200,
        message: "User was registered successfully!",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        return res.status(500).send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      }
    else return res.send(data);
  });
};

// Find a single User with a uuid
exports.findOne = (req, res) => {
  User.findByUUId(req.params.uuid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found User with id ${req.params.uuid}.`,
        });
      } else {
        return res.status(500).send({
          message: "Error retrieving User with id " + req.params.uuid,
        });
      }
    } else
      return res.send({
        status: 200,
        message: "User found",
        data: {
          uuid: data.uuid,
          avatarUrl: data.avatar_url || "",
          username: data.username,
          nickname: data.nickname,
          email: data.email,
          signature: data.signature,
        },
      });
  });
};

// Update a User identified by the username and password in the request
exports.login = (req, res) => {
  User.login(req.body.username, req.body.password_hash)
    .then((user) => {
      let token;
      Token.get(user.uuid)
        .then((tokenResult) => {
          if (tokenResult.length === 0) {
            token = jwt.sign({ username: req.body.username }, mySecret, {
              expiresIn: "24h",
            });
            return Token.create(user.uuid, token);
          } else {
            token = jwt.sign({ username: req.body.username }, mySecret, {
              expiresIn: "24h",
            });
            return Token.update(token, user.uuid);
          }
        })
        .then(() => {
          return res.send({
            status: 200,
            message: "登录成功",
            data: {
              uuid: user.uuid,
              username: user.username,
              nickname: user.nickname,
              avatarUrl: user.avatar_url,
              token: "Bearer " + token,
            },
          });
        })
        .catch((err) => {
          // 处理获取或更新 token 时的错误
          console.log("err", err);
          return res.status(500).send({
            status: 500,
            message: "内部服务器错误，无法获取或更新 token",
          });
        });
    })
    .catch((loginErr) => {
      console.log("err", loginErr);
      return res.status(401).send({
        status: 401,
        message: "账号或密码错误",
      });
    });
};

// get User info by uuid
exports.getUserInfo = (req, res) => {
  User.findByUUId(req.query.uuid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found User with id ${req.query.uuid}.`,
        });
      }
    } else {
      return res.send({
        status: 200,
        message: "User found",
        data: {
          uuid: data.uuid,
          username: data.username,
          email: data.email,
          phone_number: data.phone_number,
          signature: data.signature,
          nickname: data.nickname,
          gender: data.gender,
          birthday: data.birthday,
        },
      });
    }
  });
};

/* (err, data) => {
  if (err) {
    if (err.kind === "not_found") {
      return res.status(404).send({
        message: `Not found User with id ${req.query.username}.`,
      });
    }
    return;
  } else {
    return res.send({
      status: 200,
      message: "User found",
      data: {
        uuid: data.uuid,
        nickname: data.nickname,
        username: data.username,
        avatarUrl: data.avatar_url,
        signature: data.signature,
      },
    });
  }
} */

exports.getUserByUsername = (req, res) => {
  User.findByUsername(req.query.username)
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).send({
          message: `Not found User with username ${req.query.username}.`,
        });
      }
      return res.send({
        status: 200,
        message: "User found",
        data: {
          uuid: data.uuid,
          nickname: data.nickname,
          username: data.username,
          avatarUrl: data.avatar_url,
          signature: data.signature,
        },
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Update a User identified by uuid
exports.updateUserInfo = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  User.updateUserInfo(req.params.uuid, req.body, (err, data) => {
    if (err)
      return res.status(500).send({
        message: "Error updating User with id " + req.params.uuid,
      });
    else return res.send({ message: "User was updated successfully!" });
  });
};

// Delete a User with the specified uuid in the request
exports.delete = (req, res) => {
  User.removeByUUId(req.params.uuid, (err, data) => {
    if (err)
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found User with id ${req.params.uuid}.`,
        });
      } else {
        return res.status(500).send({
          message: "Could not delete User with id " + req.params.uuid,
        });
      }
    else return res.send({ message: `User was deleted successfully!` });
  });
};
