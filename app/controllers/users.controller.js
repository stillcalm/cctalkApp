const User = require("../models/user.model");
const mySecret = require("../config/config").SECRET;
const jwt = require("jsonwebtoken");

// Create and Save a new User
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new User(
    req.body.username,
    req.body.password_hash,
    req.body.email
  );

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      }
    else res.send(data);
  });
};

// Find a single User with a uuid
exports.findOne = (req, res) => {
  User.findByUUId(req.params.uuid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.uuid}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.uuid,
        });
      }
    } else
      res.send({
        status: 200,
        message: "User found",
        data: {
          uuid: data.uuid,
          username: data.username,
          email: data.email,
        },
      });
  });
};

// Update a User identified by the username and password in the request
exports.login = (req, res) => {
  User.login(req.body.username, req.body.password_hash, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(200).send({
          status: 200,
          message: "账号或密码错误",
        });
      }
    } else {
      const token = jwt.sign({ username: req.body.username }, mySecret, {
        expiresIn: "24h",
      });
      res.send({
        status: 200,
        message: "登录成功",
        data: {
          uuid: data.uuid,
          token: token,
        },
      });
    }
  });
};

// get User info by uuid
exports.getUserInfo = (req, res) => {
  User.findOne(req.params.uuid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.uuid}.`,
        });
      }
    } else {
      res.send({
        status: 200,
        message: "User found",
        data: {
          uuid: data.uuid,
          username: data.username,
          email: data.email,
          phone_num: data.phone_num,
          nickname: data.nickname,
          gender: data.gender,
          birthday: data.birthday,
          info: req.auth,
        },
      });
    }
  });
};

// Update a User identified by uuid
exports.updateUserInfo = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.body);
  console.log(req.params.uuid);
  User.updateUserInfo(req.params.uuid, req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message: "Error updating User with id " + req.params.uuid,
      });
    else res.send({ message: "User was updated successfully!" });
    return;
  });
};

// Delete a User with the specified uuid in the request
exports.delete = (req, res) => {
  User.removeByUUId(req.params.uuid, (err, data) => {
    if (err)
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.uuid}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.uuid,
        });
      }
    else res.send({ message: `User was deleted successfully!` });
  });
};
