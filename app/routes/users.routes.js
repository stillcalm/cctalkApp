const express = require("express");
const { jwtAuth } = require("../middleware/jwt");
const router = express.Router();
const user = require("../controllers/users.controller");

// use jwtAuth middleware to authenticate the token
//router.use(jwtAuth);

router.post("/login", user.login);
/* GET users listing. */
router.post("/register", user.create);

// Retrieve all published Tutorials
//router.get("/:uuid", user.findOne);

// Update a Tutorial with id
router.delete("/:uuid", user.delete);

router.get("/userinfo", user.getUserInfo);

router.get("/getUserByUsername", user.getUserByUsername)

router.post("/update/:uuid", user.updateUserInfo);

module.exports = router;
